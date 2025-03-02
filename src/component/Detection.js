import React, { useEffect, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs";
import Swal from "sweetalert2";

const Detection = ({ cloudinaryImageUrl }) => {
  const videoRef = useRef(null);
  const userEmbeddingRef = useRef(null);
  const warningsRef = useRef(0);
  const detectionRunningRef = useRef(false);
  const streamRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchImageEmbedding = async () => {
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = cloudinaryImageUrl;
        await new Promise((resolve) => (img.onload = resolve));

        const faceModel = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: "mediapipe",
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
          }
        );

        const faces = await faceModel.estimateFaces(img);
        if (faces.length === 1) {
          userEmbeddingRef.current = generateRobustFaceEmbedding(faces[0]);
          console.log("Stored Reference Embedding:", userEmbeddingRef.current);
        } else {
          console.error("No face detected in uploaded image.");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    };

    const detectUnfairPractices = async () => {
      if (detectionRunningRef.current) return;
      detectionRunningRef.current = true;

      const video = videoRef.current;
      const cocoModel = await cocoSsd.load();
      const faceModel = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: "mediapipe",
          solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
          modelType: "full",
        }
      );

      // Track face match consistency over time
      const matchHistory = [];
      const historyLength = 5;
      const matchThreshold = 0.6; // 60% matches required to confirm identity

      const detect = async () => {
        if (!video || video.readyState !== 4) return;

        const objects = await cocoModel.detect(video);
        const faces = await faceModel.estimateFaces(video, { returnTensors: false });

        let faceVisible = faces.length > 0;
        let detectedObjects = objects.map((obj) => obj.class).join(", ");

        // Unallowed objects check
        const flaggedItems = ["book", "cell phone", "laptop"];
        const foundItems = objects.filter((obj) => flaggedItems.includes(obj.class));

        if (!faceVisible) warnUser("Face not visible!");
        if (foundItems.length > 0) warnUser(` objects detected: ${detectedObjects}`);
        if (faces.length > 1) warnUser("Multiple faces detected!");

        // Face verification
        if (faces.length === 1 && userEmbeddingRef.current) {
          const newEmbedding = generateRobustFaceEmbedding(faces[0]);
          const matchScore = faceMatchScore(newEmbedding, userEmbeddingRef.current);
          
          // Track match history for more stable results
          matchHistory.push(matchScore > 0.75);
          if (matchHistory.length > historyLength) {
            matchHistory.shift(); // Remove oldest result
          }
          
          // Calculate percentage of matches
          const matchPercentage = matchHistory.filter(Boolean).length / matchHistory.length;
          const isMatched = matchPercentage >= matchThreshold;
          
          console.log("Face Match Score:", matchScore.toFixed(2));
          console.log("Match History:", matchHistory);
          console.log("Face Match:", isMatched ? "✅ Matched" : "❌ Not Matched");

          if (!isMatched && matchHistory.length >= 3) {
            warnUser("Face mismatch! Possible impersonation.");
          }
        }

        // Memory cleanup
        tf.dispose();

        timeoutRef.current = setTimeout(detect, 500); // Debounce to avoid excessive processing
      };

      detect();
    };

    const warnUser = (message) => {
      warningsRef.current += 1;
      Swal.fire({
        icon: "warning",
        title: `Warning ${warningsRef.current}`,
        text: message,
        timer: 2000,
      });
    };

    // More robust face embedding that accounts for facial features and relationships
    const generateRobustFaceEmbedding = (face) => {
      // Extract key facial landmarks
      const keypoints = face.keypoints;
      
      // Get key facial features
      const rightEye = getAverageLandmark(keypoints, [33, 133, 160, 159, 158, 157, 173]);
      const leftEye = getAverageLandmark(keypoints, [362, 398, 384, 385, 386, 387, 388]);
      const nose = getAverageLandmark(keypoints, [1, 2, 3, 4, 5, 6]);
      const mouth = getAverageLandmark(keypoints, [61, 185, 40, 39, 37, 0, 267, 269, 270, 409]);
      const jawline = getAverageLandmark(keypoints, [127, 162, 21, 54, 103, 67, 109, 10, 338, 297, 332, 284, 251, 389]);
      
      // Create ratios and relationships between facial features (more robust to lighting/angle)
      const faceWidth = calculateDistance(keypoints[234], keypoints[454]);
      const faceHeight = calculateDistance(keypoints[10], keypoints[152]);
      
      // Calculate eye distance ratio
      const eyeDistance = calculateDistance(rightEye, leftEye) / faceWidth;
      
      // Calculate eye to nose ratios
      const rightEyeToNose = calculateDistance(rightEye, nose) / faceHeight;
      const leftEyeToNose = calculateDistance(leftEye, nose) / faceHeight;
      
      // Calculate nose to mouth ratio
      const noseToMouth = calculateDistance(nose, mouth) / faceHeight;
      
      // Generate final embedding with facial proportions (more stable across angles)
      return [
        eyeDistance,
        rightEyeToNose,
        leftEyeToNose,
        noseToMouth,
        faceWidth / faceHeight, // face aspect ratio
      ];
    };

    // Helper to find average position of a group of landmarks
    const getAverageLandmark = (keypoints, indices) => {
      const filteredPoints = indices
        .map(idx => keypoints.find(kp => kp.name === `${idx}`))
        .filter(Boolean);
      
      if (filteredPoints.length === 0) {
        // Fall back to any points if named points aren't found
        const points = indices.map(i => keypoints[i]).filter(Boolean);
        if (points.length === 0) return { x: 0, y: 0 };
        
        const sumX = points.reduce((sum, p) => sum + p.x, 0);
        const sumY = points.reduce((sum, p) => sum + p.y, 0);
        return { x: sumX / points.length, y: sumY / points.length };
      }
      
      const sumX = filteredPoints.reduce((sum, p) => sum + p.x, 0);
      const sumY = filteredPoints.reduce((sum, p) => sum + p.y, 0);
      return { x: sumX / filteredPoints.length, y: sumY / filteredPoints.length };
    };

    // Calculate Euclidean distance between two points
    const calculateDistance = (point1, point2) => {
      return Math.sqrt(
        Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
      );
    };

    // Calculate similarity score between embeddings (0 to 1, where 1 is identical)
    const faceMatchScore = (embedding1, embedding2) => {
      if (embedding1.length !== embedding2.length) return 0;
      
      // Calculate Euclidean distance
      let sumSquaredDifferences = 0;
      for (let i = 0; i < embedding1.length; i++) {
        sumSquaredDifferences += Math.pow(embedding1[i] - embedding2[i], 2);
      }
      
      const distance = Math.sqrt(sumSquaredDifferences);
      // Convert distance to similarity score (inverted and normalized)
      return Math.max(0, 1 - (distance / Math.sqrt(embedding1.length)));
    };

    fetchImageEmbedding();
    setupCamera().then(detectUnfairPractices);

    return () => {
      detectionRunningRef.current = false;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline className="d-none" />;
};

export default Detection;
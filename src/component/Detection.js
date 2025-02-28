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

  useEffect(() => {
    const fetchImageEmbedding = async () => {
      try {
        const faceModel = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: "mediapipe",
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
          }
        );

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = cloudinaryImageUrl;
        await new Promise((resolve) => (img.onload = resolve));

        const face = await faceModel.estimateFaces(img);
        if (face.length === 1) {
          userEmbeddingRef.current = generateFaceEmbedding(face[0]);
          console.log("Stored Embedding:", userEmbeddingRef.current);
        } else {
          console.error("No face detected in uploaded image.");
        }
      } catch (error) {
        console.error("Error fetching image embedding:", error);
      }
    };

    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      videoRef.current.srcObject = stream;
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
        }
      );

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
        if (foundItems.length > 0) warnUser(`Unallowed objects detected: ${detectedObjects}`);

        if (faces.length === 1 && userEmbeddingRef.current) {
          const newEmbedding = generateFaceEmbedding(faces[0]);
          console.log(newEmbedding);
          
          const match = compareEmbeddings(newEmbedding, userEmbeddingRef.current);
          console.log("Face Match:", match ? "✅ Matched" : "❌ Not Matched");

          if (!match) warnUser("Face mismatch! Possible impersonation.");
        }

        tf.dispose();
        setTimeout(detect, 500);// Debounce for performance
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

    const generateFaceEmbedding = (face) => {
      return normalizeVector(face.keypoints.map((kp) => [kp.x, kp.y, kp.z || 0]).flat());
    };
    
    const normalizeVector = (vector) => {
      const magnitude = Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
      return vector.map((val) => val / magnitude);
    };
    
    const compareEmbeddings = (embedding1, embedding2, cosThreshold = 0.6, distThreshold = 15) => {
      // Cosine similarity
      const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
      const cosineMatch = dotProduct > cosThreshold;
    
      // Euclidean distance (lower = more similar)
      const distance = Math.sqrt(
        embedding1.reduce((acc, val, i) => acc + Math.pow(val - embedding2[i], 2), 0)
      );
      const distanceMatch = distance < distThreshold;
    
      console.log(`Cosine Similarity: ${dotProduct}, Distance: ${distance}`);
    
      return cosineMatch && distanceMatch;
    };
    
    fetchImageEmbedding();
    setupCamera().then(detectUnfairPractices);

    return () => {
      detectionRunningRef.current = false;
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline className="d-none" />;
};

export default Detection;

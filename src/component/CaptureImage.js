import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import User from "../assests/user.jpg";
import Frame from "../assests/Frame.png";
import Blur from "../assests/blur.png";
import Background from "../assests/background.png";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import * as mobilenet from "@tensorflow-models/mobilenet";


const CaptureImage = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc,setImageSrc] = useState(null)
  const [isBlurry, setIsBlurry] = useState(null);
  const [faceStatus, setFaceStatus] = useState("Not Checked");

  const capturePhoto = useCallback( async () => {
    const imageSrc = videoRef?.current?.getScreenshot();
    setImageSrc(imageSrc);

    const imgElement = new Image();
    imgElement.src = imageSrc;

    imgElement.onload = async () => {
      await verifyImage(imgElement);
      setLoading(false);
    };
  }, [videoRef]);

  const verifyImage = async (imageElement) => {
    const blazeFaceModel = await blazeface.load();
    const mobileNetModel = await mobilenet.load();

    // Blur Detection (MobileNet)
    const prediction = await mobileNetModel.classify(imageElement);
    const blurLabel = prediction.find((p) =>
      p.className.includes("blurry") || p.className.includes("clear")
    );
    setIsBlurry(blurLabel?.className.includes("blurry"));

    // Face Detection (BlazeFace)
    const faces = await blazeFaceModel.estimateFaces(imageElement, false);
    let status = "Face is properly visible";

    if (faces.length === 0) {
      status = "No face detected";
    } else {
      faces.forEach((face) => {
        const [x, y, width, height] = face.topLeft.concat(face.bottomRight);
        const imgWidth = imageElement.width;
        const imgHeight = imageElement.height;

        // Check if the face is too close to the edges
        const margin = 20;
        if (
          x <= margin ||
          y <= margin ||
          (x + width) >= (imgWidth - margin) ||
          (y + height) >= (imgHeight - margin)
        ) {
          status = "Face is partially cut";
        }
      });
    }

    setFaceStatus(status);
  };

  return (

    <div className="row tw-p-4 tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-100">
         <div className="col-md-5 tw-p-2 tw-flex tw-justify-center tw-border-r-2 tw-border-black">
                 <div className="tw-w-4/5 tw-rounded-md tw-p-2">
                   <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700">
                     📋  Instructions
                   </h1>
                   <div className=" tw-p-1">
                     <div className="tw-flex tw-items-start tw-gap-2">
                       <i className="fa-solid fa-check-circle tw-text-green-500 tw-mt-1"></i>
                       <p className="tw-text-gray-600">
                         Ensure the photo is clear and well-focused.
                       </p>
                     </div>
                     <div className="tw-flex tw-items-start tw-gap-2">
                       <i className="fa-solid fa-check-circle tw-text-green-500 tw-mt-1"></i>
                       <p className="tw-text-gray-600">
                         Ensure proper lighting for the photo.
                       </p>
                     </div>
                   </div>
         
                   <div className=" tw-p-1">
                     <h4 className=" tw-text-sm tw-text-emerald-500">✅ Good Scenario</h4>
                     {/* <img src={Good} className = "tw-mb-1 tw-rounded-md" alt="" />
                    
                    
                     <h4 className="tw-text-sm tw-text-red-600">❌ Bad Scenarios</h4>
                     <img src={Bad} className = "tw-mt-1 tw-rounded-md" alt="" /> */}
                     
                   </div>
                 </div>
               </div>
             <div className="col-md-6 tw-border-r-2 tw-border-r-gray-600">
                <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-border-b tw-pb-3">
                       🎥 Capture Your Image
                   </h1>
                  <p className=" tw-text-gray-500 tw-text-sm tw-mb-4">
                    Please allign yourself to the Center of screen and press "capture your Image" button
                  </p>
                  <div className=" tw-p-3 tw-flex tw-justify-start tw-flex-col md:tw-flex-row tw-gap-9">
                    <Webcam
                      className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
                      screenshotFormat="image/jpeg"
                      ref={videoRef}
                    />
                   {imageSrc ? (
                         <img
                           src={imageSrc}
                           alt="Captured Image"
                           className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
                         />
                       ) : (
                         <div className="tw-flex tw-items-center tw-justify-center tw-w-1/2 tw-h-[200px] tw-bg-gray-100 tw-rounded-lg tw-border tw-border-dashed tw-border-gray-400">
                           <p className="tw-text-gray-500">Captured image will appear here.</p>
                         </div>
                     )}
                  </div>
          
                  <div className=" tw-flex tw-justify-center tw-gap-8 tw-p-6">
                    <button
                      className=" tw-px-8 tw-py-2 tw-bg-green-500 tw-border-0 tw-rounded-md tw-shadow-md tw-no-underline tw-text-white tw-font-semibold hover:tw-bg-green-600 tw-transition-all tw-duration-300"
                      onClick={capturePhoto}
                    >
                      Capture Image
                    </button>
          
                    <button
                      className=" tw-px-6 tw-py-3 tw-bg-red-500 tw-text-white tw-rounded-lg tw-shadow-lg hover:tw-bg-red-600 tw-transition-all tw-duration-300 tw-transform hover:tw-scale-105 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500 focus:tw-ring-offset-2 tw-border-0"
                      onClick={() => {
                        setLoading(null);
                      }}
                    >
                      Retake
                    </button>
                  </div>
                </div>
                </div>
     
  );
};

export default CaptureImage;

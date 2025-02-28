import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import User from "../assests/user.jpg";
import GoodID from "../assests/GoodID.png";
import Bad1 from "../assests/Bad1.png";
import Bad2 from "../assests/Bad2.png";

const CaptureID = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const capturePhoto = useCallback(async () => {
    const imageSrc = videoRef?.current?.getScreenshot();
    setLoading(imageSrc);
  }, [videoRef]);

  return (
    <div className="row tw-p-2 tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-100">
      <div className="col-md-5 tw-p-2 tw-flex tw-justify-center tw-border-r-2 tw-border-black">
        <div className="tw-w-4/5 tw-rounded-md tw-p-2">
          <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700">
            📋 Instructions
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
            <img src={GoodID} className = "tw-mb-1 tw-rounded-md" alt="" />
           
           
            <h4 className="tw-text-sm tw-text-red-600">❌ Bad Scenarios</h4>
            <img src={Bad1} className = "tw-mt-1 tw-rounded-md" alt="" />
            <br />
            <img src={Bad2} className = "tw-mt-1 tw-rounded-md" alt="" />
          </div>
        </div>
      </div>
     
      <div className="col-md-6 tw-border-r-2 tw-border-r-gray-600">
      <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-border-b tw-pb-3">
             🎥 Capture Your ID
         </h1>
        <p className=" tw-text-gray-500 tw-text-sm tw-mb-4">
          Please allign yourself to the Center of screen and press "capture your
          ID" button
        </p>
        <div className=" tw-p-3 tw-flex tw-justify-start tw-flex-col md:tw-flex-row tw-gap-9">
          <Webcam
            className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
            screenshotFormat="image/jpeg"
            ref={videoRef}
          />
         {loading ? (
               <img
                 src={loading}
                 alt="Captured ID"
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
            Capture your ID
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

// const CaptureID = () => {
//   const videoRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   const capturePhoto = useCallback(() => {
//     const imageSrc = videoRef?.current?.getScreenshot();
//     setLoading(imageSrc);
//   }, [videoRef]);

//   return (
//     <div className="tw-flex tw-min-h-[40vh] tw-bg-gray-50 tw-rounded-lg tw-shadow-lg">
//       {/* Left Column: Instructions */}
//       <div className="tw-w-1/2 tw-bg-white tw-rounded-l-lg tw-p-6 tw-flex tw-flex-col tw-justify-between">
//         <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700">
//           📋 Instructions
//         </h1>
// <div className="">
//           <div className="tw-flex tw-items-start tw-gap-2">
//             <i className="fa-solid fa-check-circle tw-text-green-500"></i>
//             <p className="tw-text-gray-600">Ensure the photo is clear and well-focused.</p>
//           </div>
//           <div className="tw-flex tw-items-start tw-gap-2">
//             <i className="fa-solid fa-check-circle tw-text-green-500 tw-mt-1"></i>
//             <p className="tw-text-gray-600">Ensure proper lighting for the photo.</p>
//           </div>
//         </div>

//         <div className="">
//           <h4 className="tw-text-sm tw-text-gray-600 tw-font-medium">✅ Good Scenario</h4>
//           <img
//             src={GoodID}
//             alt="Good ID Example"
//             className="tw-rounded-lg tw-w-full tw-h-32 tw-object-contain tw-shadow-md tw-my-4"
//           />
//           <h4 className="tw-text-sm tw-text-gray-600 tw-font-medium">❌ Bad Scenarios</h4>
//           <div className="tw-grid tw-grid-cols-2 tw-gap-4">
//             <img
//               src={Bad1}
//               alt="Bad ID Example 1"
//               className="tw-rounded-lg tw-shadow-md"
//             />
//             <img
//               src={Bad2}
//               alt="Bad ID Example 2"
//               className="tw-rounded-lg tw-shadow-md"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Right Column: Webcam and Capture */}
//       <div className="tw-w-1/2 tw-bg-white tw-rounded-r-lg tw-p-6 tw-flex tw-flex-col tw-justify-between">
//         <div>
//           <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-border-b tw-pb-3">
//             🎥 Capture Your ID
//           </h1>
//           <p className="tw-text-gray-500 tw-text-sm tw-mb-4">
//             Align your ID to the center of the screen and press the "Capture your ID" button.
//           </p>

//           <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
//             {/* Webcam Section */}
//             <Webcam
//               className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
//               screenshotFormat="image/jpeg"
//               ref={videoRef}
//             />
//             {/* Captured Image Section */}
//             {loading ? (
//               <img
//                 src={loading}
//                 alt="Captured ID"
//                 className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
//               />
//             ) : (
//               <div className="tw-flex tw-items-center tw-justify-center tw-w-1/2 tw-h-[200px] tw-bg-gray-100 tw-rounded-lg tw-border tw-border-dashed tw-border-gray-400">
//                 <p className="tw-text-gray-500">Captured image will appear here.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="tw-flex tw-justify-center tw-gap-6">
//           <button
//             className="tw-px-6 tw-py-2 tw-bg-green-500 tw-text-white tw-rounded-lg tw-shadow-lg tw-font-medium hover:tw-bg-green-600 tw-transition-all"
//             onClick={capturePhoto}
//           >
//             Capture your ID
//           </button>
//           <button
//             className="tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-rounded-lg tw-shadow-lg tw-font-medium hover:tw-bg-red-600 tw-transition-all"
//             onClick={() => setLoading(null)}
//           >
//             Retake
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CaptureID;

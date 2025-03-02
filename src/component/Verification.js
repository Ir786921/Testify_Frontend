import { React, useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Link, useNavigate, useParams } from "react-router-dom";
import Good from "../assests/good.png";
import Bad from "../assests/Bad.png";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../Redux/UserSlice";
import { io } from "socket.io-client";

import RegImg from "../assests/R.png";
import GoodID from "../assests/GoodID.png";
import Bad1 from "../assests/Bad1.png";
import Bad2 from "../assests/Bad2.png";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";

import StatusMessage from "../utils/StatusMessage";
import {
  uploadID,
  uploadImage,
} from "../TestEnvHelperFunctions/uploadFunctions";

const Verification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const UserDetails = useSelector((store) => store.User.item);
  const [activeTab, setActiveTab] = useState("registration"); 
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [idSrc, setIdSrc] = useState(null);
  const [isBlurry, setIsBlurry] = useState(null);
  const [faceStatus, setFaceStatus] = useState(false);
  const [idStatus, setIdStatus] = useState(false);
  const [idBlurry, setIdBlurry] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);

  // Capture photo function placeholder
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  const dispatch = useDispatch();
  
    
  
    useEffect(() => {
  
      const socket = io("http://localhost:8000", {
        withCredentials: true,
         
      });
  
      socket.on("connect", () => {
        console.log("Frontend socket connected with ID:", socket.id);
      });
      
      if (UserDetails?._id) {
        console.log(`Listening to update`);
        socket.on("update", (updatedData) => {
          console.log(" data updated:", updatedData);
          dispatch(updateUser(updatedData)); // Update Redux store with the new data
        });
      }
    
      return () => {
        if (UserDetails?._id) {
          console.log(`Removing listener update`);
          socket.off("update");
        }
      };
  
      
    }, [dispatch]);

  useEffect(() => {
    if (faceStatus) {
      uploadImage(imageSrc,UserDetails?._id);
    }
  }, [faceStatus]);

  useEffect(() => {
    if (idStatus) {
      uploadID(idSrc,UserDetails?._id);
    }
  }, [idStatus]);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current) return;

    const imageSrc = videoRef.current.getScreenshot();
    setImageSrc(imageSrc);

    // Convert base64 image to an HTML Image element
    const imgElement = new Image();
    imgElement.src = imageSrc;

    imgElement.onload = async () => {
      await verifyImage(imgElement);
      setLoading(false);
    };

    setIsCaptured(true);

    setTimeout(() => {
      setIsCaptured(false);
    }, 4000);


      
   
  }, [videoRef]);

  const isImageBlurry = async (imageElement) => {
    return new Promise(async (resolve) => {
      // Convert image to grayscale tensor
      const tensor = tf.browser
        .fromPixels(imageElement)
        .mean(2)
        .toFloat()
        .expandDims(0)
        .expandDims(-1);

      // ✅ Corrected Laplacian Kernel
      const laplacianKernel = tf
        .tensor2d(
          [
            [0, 1, 0],
            [1, -4, 1],
            [0, 1, 0],
          ],
          [3, 3],
          "float32"
        )
        .reshape([3, 3, 1, 1]); // 🔥 Fix applied

      // Apply Laplacian filter
      const edges = tf
        .depthwiseConv2d(tensor, laplacianKernel, 1, "same")
        .abs();

      // Compute variance of the edges
      const variance = (await edges.mean().data())[0];

      console.log("🔍 Laplacian Variance:", variance);
      const blurThreshold = 5;
      // ✅ Adjust threshold (tune this value if needed)
      if (variance < blurThreshold) {
        console.log("🛑 Image is blurry!");
        resolve(false); // Now false means blurry
      } else {
        console.log("✅ Image is clear!");
        resolve(true); // Now true means clear
      } // If variance is low, image is blurry
    });
  };
  const verifyImage = async (imageElement) => {
    const blazeFaceModel = await blazeface.load();
    const isBlurry = await isImageBlurry(imageElement);
    setIsBlurry(isBlurry);

    // Face Detection (BlazeFace)
    const faces = await blazeFaceModel.estimateFaces(imageElement, false);
    let status = false;

    if (faces.length > 0) {
      const [x, y] = faces[0].topLeft;
      const [bottomX, bottomY] = faces[0].bottomRight;
      const imgWidth = imageElement.width;
      const imgHeight = imageElement.height;
      const margin = 13; // Safe margin from edges

      // Check if the face is properly inside the frame
      if (
        x >= margin &&
        y >= margin &&
        bottomX <= imgWidth - margin &&
        bottomY <= imgHeight - margin
      ) {
        status = true;
      }
    }

    setFaceStatus(status);
  };

  const captureID = useCallback(async () => {
    if (!photoRef.current) return;

    const imageSrc = photoRef.current.getScreenshot();
    setIdSrc(imageSrc);

    // Convert base64 image to an HTML Image element
    const imgElement = new Image();
    imgElement.src = imageSrc;

    imgElement.onload = async () => {
      await verifyID(imgElement);
      setLoading(false);
    };

    setIsCaptured(true);

    setTimeout(() => {
      setIsCaptured(false);
    }, 4000);

   
    
    
  }, [photoRef]);

  const isIDBlurry = async (imageElement) => {
    return new Promise(async (resolve) => {
      // Convert image to grayscale tensor
      const tensor = tf.browser
        .fromPixels(imageElement)
        .mean(2)
        .toFloat()
        .expandDims(0)
        .expandDims(-1);

      // ✅ Corrected Laplacian Kernel
      const laplacianKernel = tf
        .tensor2d(
          [
            [0, 1, 0],
            [1, -4, 1],
            [0, 1, 0],
          ],
          [3, 3],
          "float32"
        )
        .reshape([3, 3, 1, 1]); // 🔥 Fix applied

      // Apply Laplacian filter
      const edges = tf
        .depthwiseConv2d(tensor, laplacianKernel, 1, "same")
        .abs();

      // Compute variance of the edges
      const variance = (await edges.mean().data())[0];

      console.log("🔍 Laplacian Variance:", variance);
      const blurThreshold = 5;
      // ✅ Adjust threshold (tune this value if needed)
      if (variance < blurThreshold) {
        console.log("🛑 id is blurry!");
        resolve(false); // Now false means blurry
      } else {
        console.log("✅ id is clear!");
        resolve(true); // Now true means clear
      } // If variance is low, image is blurry
    });
  };
  const verifyID = async (imageElement) => {
    const blazeFaceModel = await blazeface.load();
    const isBlurry = await isIDBlurry(imageElement);
    setIdBlurry(isBlurry);

    // Face Detection (BlazeFace)
    const faces = await blazeFaceModel.estimateFaces(imageElement, false);
    let status = false;

    if (faces.length > 0) {
      const [x, y] = faces[0].topLeft;
      const [bottomX, bottomY] = faces[0].bottomRight;
      const imgWidth = imageElement.width;
      const imgHeight = imageElement.height;
      const margin = 13; // Safe margin from edges

      // Check if the face is properly inside the frame
      if (
        x >= margin &&
        y >= margin &&
        bottomX <= imgWidth - margin &&
        bottomY <= imgHeight - margin
      ) {
        status = true;
      }
    }

    setIdStatus(status);
  };
  const InstImage = [
    {
      message: " Ensure you are in a well-lit room.",
    },
    {
      message:
        "Avoid backlighting (light behind you) and overly bright light sources.",
    },
    {
      message:
        "Use a plain background, preferably a wall, to avoid distractions.",
    },
    {
      message:
        "Your entire face should be visible. Do not wear sunglasses, hats, or masks",
    },
  ];

  const InstCard = [
    {
      message:
        "The entire card should be within the frame, with all edges visible.",
    },
    {
      message:
        "Do not cover any part of the card with fingers, objects, or glare",
    },
    {
      message:
        "Ensure that text, numbers, and any necessary details on the card are clear and legible.",
    },
    {
      message:
        "Hold the card steady and wait for it to focus before capturing the image",
    },
    {
      message: "Do not crop or cut off any part of the card",
    },
  ];

  return (
    <div className=" tw-flex md:tw-flex-row tw-flex-col tw-min-h-screen tw-w-full tw-bg-gradient-to-br tw-from-blue-100 tw-to-purple-200 border border-success">
      <div className=" md:tw-w-1/2 tw-w-full tw-border-r-2 tw-border-gray-300">
        {activeTab === "registration" && (
          <div className="tw-w-full tw-max-h-full">
            <img
              src={RegImg}
              alt="Registration"
              className="tw-w-full tw-h-[450] tw-object-cover tw-rounded-lg "
            />
          </div>
        )}

        {activeTab === "captureImage" && (
          <div className="tw-w-full tw-flex tw-p-10 tw-shadow-lg tw-h-full tw-bg-white">
            <div className="tw-w-4/5 tw-rounded-md tw-p-2">
              <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700">
                📋 Instructions
              </h1>
              <div className=" tw-p-1 tw-mt-2 tw-mb-2">
                {InstImage.map((inst, index) => {
                  return (
                    <div
                      className="tw-flex tw-items-start tw-gap-2"
                      key={index}
                    >
                      <i className="fa-solid fa-check-circle tw-text-green-500 tw-mt-1"></i>
                      <p className="tw-text-gray-600 tw-text-md">
                        {inst?.message}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className=" tw-p-1">
                <h4 className=" tw-text-sm tw-text-emerald-500">
                  ✅ Good Scenario
                </h4>
                <img src={Good} className=" tw-rounded-md" alt="" />

                <h4 className="tw-text-sm tw-text-red-600 tw-mt-4">
                  ❌ Bad Scenarios
                </h4>
                <img src={Bad} className="tw-mt-1 tw-rounded-md" alt="" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "captureCard" && (
          <div className="tw-w-full  tw-p-8 tw-shadow-lg tw-h-full tw-bg-white">
            <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700">
              📋 Instructions
            </h1>
            <div className=" tw-p-1">
              {InstCard.map((inst, index) => {
                return (
                  <div className="tw-flex tw-items-start tw-gap-2" key={index}>
                    <i className="fa-solid fa-check-circle tw-text-green-500 tw-mt-1"></i>
                    <p className="tw-text-gray-600 tw-text-md">
                      {inst?.message}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className=" tw-p-1">
              <h4 className=" tw-text-sm tw-text-emerald-500 tw-mt-2">
                ✅ Good Scenario
              </h4>
              <img src={GoodID} className="tw-mb-1 tw-rounded-md" alt="" />

              <h4 className="tw-text-sm tw-text-red-600 tw-mt-4">
                ❌ Bad Scenarios
              </h4>
              <img src={Bad1} className="tw-mt-1 tw-rounded-md" alt="" />
              <br />
              <img src={Bad2} className="tw-mt-1 tw-rounded-md" alt="" />
            </div>
          </div>
        )}
      </div>
      <div className=" md:tw-w-1/2 tw-p-6 tw-w-full">
        <div className="tw-flex tw-gap-10 tw-p-3 tw-rounded-lg tw-w-full tw-min-w-md tw-justify-between">
          <Tab
            label="Registration"
            isActive={activeTab === "registration"}
            onClick={() => setActiveTab("registration")}
          />
          <Tab
            label="Capture Image"
            isActive={activeTab === "captureImage"}
            onClick={() => {
              setActiveTab("captureImage");
            }}
          />

          <Tab
            label="Capture ID"
            isActive={activeTab === "captureCard"}
            onClick={() => setActiveTab("captureCard")}
          />
        </div>
        {activeTab === "registration" && (
          <div className=" tw-flex  tw-items-center tw-mt-8 tw-ml-4 ">
            <div className="tw-w-full tw-max-w-lg tw-p-8 tw-shadow-lg tw-rounded-xl tw-bg-white">
              <h2 className="tw-text-center tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-6">
                Candidate Verification
              </h2>
              <p className="tw-text-md tw-font-medium tw-text-gray-700 tw-mb-4">
                Please verify your details before proceeding
              </p>
              <div className="tw-space-y-6">
                <div>
                  <label className="tw-text-sm tw-font-semibold tw-text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={UserDetails?.FullName}
                    disabled
                    className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2"
                  />
                </div>
                <div>
                  <label className="tw-text-sm tw-font-semibold tw-text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    value={UserDetails?.Email}
                    disabled
                    className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2"
                  />
                </div>
                <div>
                  <label className="tw-text-sm tw-font-semibold tw-text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={UserDetails?.MobileNo}
                    disabled
                    className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2"
                  />
                </div>

                <p className="tw-text-sm tw-text-gray-600 tw-mt-4">
                  Ensure your details are correct before starting the assessment
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "captureImage" && (
          <div className="tw-border-r-2 tw-border-r-gray-600  tw-p-3">
            <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-border-b tw-pb-3">
              🎥 Capture Your Image
            </h1>
            <p className=" tw-text-gray-500 tw-text-sm tw-mb-4">
              Please allign yourself to the Center of screen and press "capture
              your Image" button
            </p>
            <div className=" tw-p-3 tw-flex tw-justify-center tw-flex-col md:tw-flex-row tw-gap-9 tw-mt-6">
              <Webcam
                className="tw-object-cover md:tw-m-auto tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md border border-success"
                screenshotFormat="image/jpeg"
                ref={videoRef}
              />
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Captured ID"
                  className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
                />
              ) : (
                <div className="tw-flex tw-items-center tw-justify-center tw-w-1/2 tw-h-[200px] tw-bg-gray-100 tw-rounded-lg tw-border tw-border-dashed tw-border-gray-400">
                  <p className="tw-text-gray-500">
                    Captured image will appear here.
                  </p>
                </div>
              )}
            </div>
            {isCaptured ? (
              <div className="tw-flex tw-items-center tw-justify-center tw-p-4 tw-mb-6 tw-bg-indigo-50 tw-rounded-lg">
                <span className="tw-text-indigo-700 tw-font-medium">
                  Processing Image
                </span>
                <div className="tw-ml-3 tw-w-6 tw-h-6 tw-border-4 tw-border-t-4 tw-border-solid tw-border-indigo-600 tw-border-t-transparent tw-rounded-full tw-animate-spin"></div>{" "}
              </div>
            ) : (
              <div className=" tw-flex tw-justify-center">
                {imageSrc && (
                  <StatusMessage isBlurry={isBlurry} faceStatus={faceStatus} />
                )}
              </div>
            )}

            <div className="tw-flex tw-gap-4 tw-justify-center tw-mt-4">
              <button
                className="tw-flex tw-items-center tw-px-6 tw-py-3 tw-bg-indigo-600 tw-text-white tw-font-medium tw-rounded-lg tw-shadow-md hover:tw-bg-indigo-700 tw-transition-all tw-duration-300 focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 tw-border-0 disabled:tw-opacity-60 disabled:tw-pointer-events-none"
                onClick={capturePhoto}
              >
                <i className="fa-solid fa-camera tw-mr-2"></i>
                Capture ID
              </button>

              <button
                className="tw-flex tw-items-center tw-px-6 tw-py-3 tw-bg-white tw-text-gray-700 tw-border tw-border-gray-300 tw-font-medium tw-rounded-lg tw-shadow-sm hover:tw-bg-gray-50 tw-transition-all tw-duration-300 focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2 disabled:tw-opacity-60 disabled:tw-pointer-events-none"
                onClick={() => {
                  setImageSrc(null);
                  setIsBlurry(false);
                  setFaceStatus(false)
                }}
              >
                <i className="fa-solid fa-rotate-right tw-mr-2"></i>
                Retake
              </button>
            </div>
          </div>
        )}

        {activeTab === "captureCard" && (
          <div className="tw-border-r-2 tw-border-r-gray-600 tw-p-3">
            <h1 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-border-b tw-pb-3">
              🎥 Capture Your ID
            </h1>
            <p className=" tw-text-gray-500 tw-text-sm tw-mb-4">
              Please allign yourself to the Center of screen and press "capture
              your ID" button
            </p>
            <div className=" tw-p-3 tw-flex tw-justify-start tw-flex-col md:tw-flex-row tw-gap-9 tw-mt-6">
              <Webcam
                className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
                screenshotFormat="image/jpeg"
                ref={photoRef}
              />
              {idSrc ? (
                <img
                  src={idSrc}
                  alt="Captured ID"
                  className="tw-object-cover tw-w-1/2 tw-h-[200px] tw-rounded-lg tw-border tw-border-gray-300 tw-shadow-md"
                />
              ) : (
                <div className="tw-flex tw-items-center tw-justify-center tw-w-1/2 tw-h-[200px] tw-bg-gray-100 tw-rounded-lg tw-border tw-border-dashed tw-border-gray-400">
                  <p className="tw-text-gray-500">
                    Captured image will appear here.
                  </p>
                </div>
              )}
            </div>

            {isCaptured ? (
              <div className="tw-flex tw-items-center tw-justify-center tw-p-4 tw-mb-6 tw-bg-indigo-50 tw-rounded-lg">
                <span className="tw-text-indigo-700 tw-font-medium">
                  Processing Image
                </span>
                <div className="tw-ml-3 tw-w-6 tw-h-6 tw-border-4 tw-border-t-4 tw-border-solid tw-border-indigo-600 tw-border-t-transparent tw-rounded-full tw-animate-spin"></div>
              </div>
            ) : (
              <div className=" tw-flex tw-justify-center">
                {idBlurry && (
                  <StatusMessage isBlurry={idBlurry} faceStatus={idStatus} />
                )}
              </div>
            )}

            {/* Button area */}
            <div className="tw-flex tw-gap-4 tw-justify-center tw-mt-4">
              <button
                className="tw-flex tw-items-center tw-px-6 tw-py-3 tw-bg-indigo-600 tw-text-white tw-font-medium tw-rounded-lg tw-shadow-md hover:tw-bg-indigo-700 tw-transition-all tw-duration-300 focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 tw-border-0 disabled:tw-opacity-60 disabled:tw-pointer-events-none"
                onClick={captureID}
              >
                <i className="fa-solid fa-camera tw-mr-2"></i>
                Capture ID
              </button>

              <button
                className="tw-flex tw-items-center tw-px-6 tw-py-3 tw-bg-white tw-text-gray-700 tw-border tw-border-gray-300 tw-font-medium tw-rounded-lg tw-shadow-sm hover:tw-bg-gray-50 tw-transition-all tw-duration-300 focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2 disabled:tw-opacity-60 disabled:tw-pointer-events-none"
                onClick={() => {
                  setIdSrc(null);
                  setIdBlurry(false);
                  setIdStatus(false)
                }}
              >
                <i className="fa-solid fa-rotate-right tw-mr-2"></i>
                Retake
              </button>
            </div>
          </div>
        )}

        {activeTab === "captureCard" && (
          <div className=" tw-mt-14 tw-flex tw-justify-center">
            <button
              onClick = {()=>{
                navigate(`/systemcheck/${id}`)
              }}
              disabled={!faceStatus || !idStatus}
              className=" tw-px-8 tw-py-2 tw-bg-green-500 tw-border-0 tw-rounded-md tw-shadow-md tw-no-underline tw-text-white tw-font-semibold hover:tw-bg-green-600 tw-transition-all tw-duration-300 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
            >
              Proceed to the Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`
        tw-relative
        tw-min-w-[120px]
        tw-px-6
        tw-border-0
        tw-py-3
        tw-text-sm
        tw-font-medium
        tw-transition-all
        tw-duration-200
        tw-rounded-lg
        ${
          isActive
            ? "tw-text-white tw-bg-blue-500 tw-shadow-lg tw-shadow-blue-500/30"
            : "tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-400"
        }
        focus:tw-outline-none
        focus:tw-ring-2
        focus:tw-ring-blue-500
        focus:tw-ring-offset-2
        tw-group
      `}
      onClick={onClick}
    >
      <span className="tw-relative tw-z-10 tw-flex tw-items-center tw-justify-center tw-gap-2">
        {label}
      </span>
      {isActive && (
        <span className="tw-absolute tw-bottom-0 tw-left-1/2 tw-h-1 tw-w-8 -tw-translate-x-1/2 tw-rounded-full tw-bg-white"></span>
      )}
    </button>
  );
};

export default Verification;

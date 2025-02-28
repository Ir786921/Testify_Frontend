import React, { useState, useEffect, useRef } from "react";
import DetectRTC from "detectrtc";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ConnectionSpeed from "../assests/ConnectionSpeed";
import Webcam from "react-webcam";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SegmentBar from "./SegmentBar";
import UAParser from "ua-parser-js";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import { useSelector } from "react-redux";
import TestNetworkSpeed from "../assests/ConnectionSpeed";

const SystemCheck = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { id } = useParams();
  const navigate = useNavigate();

  function clickhandle() {
    navigate(`/testenv/${id}`);
  }
  const Network = useSelector((Store) => Store.networkSpeed.value);

  // State to manage steps

  const [volumeLevel, setVolumeLevel] = useState(0);


  const [speed, setSpeed] = useState();

  const steps = ["Browser check", "Webcam check", "Mic check"];

  const [browserInfo, setBrowserInfo] = useState({ name: "", version: 0 });
  const [isBrowserCompatible, setIsBrowserCompatible] = useState(false);
  const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const [isNetworkOnline, setIsNetworkOnline] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [step, setStep] = useState(0);
  const speechOutputRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  // ✅ Check Browser Compatibility
  const checkBrowserCompatibility = () => {
    return new Promise((resolve) => {
      const parser = new UAParser();
      const browser = parser.getBrowser();
      const version = parseFloat(browser.version?.split(".")[0] || "0");
      
      setBrowserInfo({ 
        name: browser.name || 'Unknown', 
        version: version 
      });

      if (
        (browser.name === "Chrome" && version > 80) ||
        (browser.name === "Firefox" && version > 78)
      ) {
        setIsBrowserCompatible(true);
      } else {
        setIsBrowserCompatible(false);
        setErrorMsg((prev) => [
          ...prev,
          "Unsupported browser. Please update or use Chrome/Firefox."
        ]);
      }
      resolve();
    });
  };

  // ✅ Check Webcam
  const checkWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsWebcamAvailable(true);
    } catch (error) {
      setErrorMsg((prev) => [
        ...prev,
        "Webcam access denied. Please allow webcam permission."
      ]);
      setIsWebcamAvailable(false);
    }
  };

  const checkMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsMicrophoneAvailable(true);
    } catch (error) {
      setErrorMsg((prev) => [
        ...prev,
        "Microphone access denied. Please allow microphone permission."
      ]);
      setIsMicrophoneAvailable(false);
    }
  };

  const handleStartListening = () => {
    resetTranscript(); // Clear previous transcript
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    // Stop after 6 seconds
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }, 6000); // 6000ms = 6 seconds
  };

  // const checkMicrophone =  async() => {
  //   try {
      
  //     const stream =  await navigator.mediaDevices.getUserMedia({ audio: true });
  //     stream.getTracks().forEach(track => track.stop()); 
  //     setIsMicrophoneAvailable(true)
     
  
  //   } catch (error) {
     
  //     setIsMicrophoneAvailable(false)
  //     setErrorMsg((prev)=>[...prev,"Microphone access denied. Please allow Microphone permission."]);
      
  //   }
  // };

  

 console.log(Number(Math.round(Network)));
 


 const checkNetwork = () => {
  return new Promise((resolve) => {
    try {
      // Convert Network from string format like "74.80" to float
      const speed = typeof Network === 'string' ? parseFloat(Network) : Network;
      console.log('Current network speed:', speed);

      // Set isNetworkOnline to true only if the speed is greater than 2.0 and the network is online
      if (!isNaN(speed) && speed > 2.0 && navigator.onLine) {
        setIsNetworkOnline(true);
        setErrorMsg(prev => prev.filter(msg => !msg.includes("Internet is too slow")));
      } else {
        setIsNetworkOnline(false);
        setErrorMsg(prev => {
          if (!prev.includes("Internet is too slow")) {
            return [...prev, "Internet is too slow"];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error checking network:', error);
      setIsNetworkOnline(false);
    }
    resolve();
  });
};



const finalCheck = () => {
  return new Promise((resolve) => {
    const allChecks = {
      browser: isBrowserCompatible,
      webcam: isWebcamAvailable,
      microphone: isMicrophoneAvailable,
      network: isNetworkOnline,
      networkSpeed: Network
    };
    console.log("All checks completed", allChecks);
    
    // You can dispatch the results to Redux store if needed
    // dispatch(setCheckResults(allChecks));
    
    resolve();
  });
};

useEffect(() => {
  if (Network !== undefined) {
    checkNetwork();
  }
}, [Network]);


  useEffect(() => {
  
//  const checks = [checkBrowserCompatibility, checkWebcam, checkMicrophone, checkNetwork, finalCheck];

 let mounted = true;

 const checks = [
   checkBrowserCompatibility,
   checkWebcam,
   checkMicrophone,
   
   finalCheck
 ];

 const runChecks = async () => {
   for (let i = 0; i < checks.length; i++) {
     if (!mounted) return;
     
     setStep(i);
     const time = i === 2 ? 6000 : 3000;

     try {
       await checks[i]();
       await new Promise((resolve) => setTimeout(resolve, time));
     } catch (error) {
       console.error(`Error in check ${i}:`, error);
       setErrorMsg((prev) => [...prev, `Check ${i} failed: ${error.message}`]);
     }
   }
 };

 runChecks();

 return () => {
   mounted = false;
 };
    
    
  }, []);

  


  return (
    <div className="container-fluid tw-bg-gradient-to-br tw-from-blue-100 tw-to-purple-200">
      <div className=" tw-bg-white tw-p-10  tw-w-full">
        <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-8 tw-text-indigo-700">
          Checking System Requirements
        </h1>
        <div className="tw-mt-6 tw-mb-6">
          <h2 className="tw-text-xl tw-text-center tw-font-semibold tw-text-gray-700">
            {step < steps.length
              ? `Performing ${steps[step]}...`
              : "All checks complete!"}
          </h2>
        </div>

        <div className=" tw-flex tw-gap-5 tw-justify-between tw-flex-wrap">
          {/* Browser Check */}
          <div
            className={`
      ${step === 0 && "tw-border-2 tw-border-blue-600 tw-border-solid"}
      ${
        isBrowserCompatible
          ? "tw-border-2 tw-border-green-600 tw-border-solid"
          : `tw-border-2 tw-border-red-600 tw-border-solid`
      }

    
      tw-bg-gradient-to-br from-blue-50 to-blue-100
      tw-rounded-xl 
      tw-shadow-lg 
      tw-p-4 
      tw-max-w-xs 
      tw-mx-auto 
      tw-space-y-4
      tw-transform transition-all duration-300 hover:tw-scale-105
    `}
          >
            <div className="tw-flex tw-justify-between tw-items-center tw-gap-3">
              <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
                Browser Check
              </h2>
              <div
                className={`
          tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center
          ${isBrowserCompatible ? "tw-bg-green-100" : "tw-bg-red-100"}
        `}
              >
                {isBrowserCompatible ? (
                  <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
                ) : (
                  <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>
                )}
              </div>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white tw-rounded-lg tw-p-3 tw-shadow-sm">
              <div className="tw-relative">
                <div className="tw-w-16 tw-h-16 tw-bg-blue-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <i className="fab fa-chrome tw-text-blue-500 tw-text-3xl"></i>
                </div>
                {isBrowserCompatible ? (
                  <i className="fas fa-check-circle tw-absolute tw-top-0 tw-right-0 tw-text-green-500 tw-bg-white tw-rounded-full tw-text-lg"></i>
                ) : (
                  <i className="fas fa-times-circle tw-absolute tw-top-0 tw-right-0 tw-text-red-500 tw-bg-white tw-rounded-full tw-text-lg"></i>
                )}
              </div>
              <div>
                <p className="tw-text-gray-700 tw-font-semibold">
                  {browserInfo.name}
                </p>
                <p className="tw-text-gray-500 tw-text-sm">
                  Version: {browserInfo.version}
                </p>
              </div>
            </div>

            <div
              className={`
        p-2 rounded-lg text-center font-medium
        ${
          isBrowserCompatible
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        }
      `}
            >
              Status: {isBrowserCompatible ? "Compatible" : "Incompatible"}
            </div>
          </div>

          {/* Web Cam Check */}

          <div
            className={`
      ${step === 1 && "tw-border-2 tw-border-blue-600 tw-border-solid"}
      ${
        isWebcamAvailable
          ? "tw-border-2 tw-border-green-600 tw-border-solid"
          : `tw-border-2 tw-border-red-600 tw-border-solid`
      }

    
      tw-bg-gradient-to-br from-blue-50 to-blue-100
      tw-rounded-xl 
      tw-shadow-lg 
      tw-p-4 
      tw-w-[260px] 
      tw-mx-auto 
      tw-space-y-4
      tw-transform transition-all duration-300 hover:tw-scale-105
    `}
          >
            <div className="tw-flex tw-justify-between tw-items-center tw-gap-3">
              <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
                Camera Check
              </h2>
              <div
                className={`
          tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center
          ${isWebcamAvailable ? "tw-bg-green-100" : "tw-bg-red-100"}
        `}
              >
                {isWebcamAvailable ? (
                  <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
                ) : (
                  <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>
                )}
              </div>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white tw-rounded-lg tw-p-3 tw-shadow-sm">
              <div className="tw-relative">
                <div className="tw-w-16 tw-h-16 tw-bg-blue-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <i className="fa-solid fa-camera tw-text-blue-500 tw-text-3xl"></i>
                </div>
                {isWebcamAvailable ? (
                  <i className="fas fa-check-circle tw-absolute tw-top-0 tw-right-0 tw-text-green-500 tw-bg-white tw-rounded-full tw-text-lg"></i>
                ) : (
                  <i className="fas fa-times-circle tw-absolute tw-top-0 tw-right-0 tw-text-red-500 tw-bg-white tw-rounded-full tw-text-lg"></i>
                )}
              </div>
              <div>
                <p className="tw-text-gray-700 tw-font-semibold">Camera</p>
                <p className="tw-text-gray-500 tw-text-sm">
                  {isWebcamAvailable ? "Granted" : "Not Granted"}
                </p>
              </div>
            </div>

            <div
              className={`
        p-2 rounded-lg text-center font-medium
        ${
          isWebcamAvailable
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        }
      `}
            >
              Status: {isWebcamAvailable ? "Granted" : "Not Granted"}
            </div>
          </div>

          {/* Mic check */}

          <div
            className={`
      ${step === 2 && "tw-border-2 tw-border-blue-600 tw-border-solid"}
      ${
        isMicrophoneAvailable
          ? "tw-border-2 tw-border-green-600 tw-border-solid"
          : `tw-border-2 tw-border-red-600 tw-border-solid`
      }

    
      tw-bg-gradient-to-br from-blue-50 to-blue-100
      tw-rounded-xl 
      tw-shadow-lg 
      tw-p-4
      
      tw-w-[260px]
      tw-mx-auto 
      tw-space-y-4
      tw-transform transition-all duration-300 hover:tw-scale-105
    `}
          >
            <div className="tw-flex tw-justify-between tw-items-center tw-gap-3">
              <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
                Mic Check
              </h2>
              <div
                className={`
          tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center
          ${isMicrophoneAvailable ? "tw-bg-green-100" : "tw-bg-red-100"}
        `}
              >
                {isMicrophoneAvailable ? (
                  <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
                ) : (
                  <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>
                )}
              </div>
            </div>

            <div className="tw-bg-gradient-to-br tw-from-indigo-50 tw-to-indigo-100 tw-rounded-lg tw-p-4 tw-shadow-sm tw-overflow-hidden tw-h-[128px]">
              <h3 className="tw-text-xl tw-font-semibold tw-text-pink-600 tw-mb-3">
                Captured Audio
              </h3>
              <div className="tw-bg-pink-50 tw-p-3 tw-rounded-md tw-border tw-border-pink-100 ">
                <p className="tw-text-pink-800 tw-font-medium tw-overflow-hidden">
                  {transcript.slice(0, 20)}
                </p>
              </div>
            </div>
            
            <div
  className={`tw-mt-4 tw-px-6 tw-py-2 tw-border-2 ${isListening ? 'tw-border-gray-400' : 'tw-border-success'} 
  tw-rounded-full tw-text-center tw-cursor-pointer 
  ${isListening ? 'tw-bg-gray-300 tw-text-gray-500' : 'tw-bg-green-500 tw-text-white'} 
  hover:${isListening ? 'tw-bg-gray-300' : 'tw-bg-green-600'} 
  tw-font-semibold tw-text-sm tw-transition-all tw-duration-200 tw-transform hover:tw-scale-105 focus:outline-none`}
  disabled={isListening}
  onClick={handleStartListening}
>
  Test Mic
</div>
         

            
          </div>
          {/* Network */}
          <div
            className={`
      ${step === 3 && "tw-border-2 tw-border-blue-600 tw-border-solid"}
      ${
        isNetworkOnline
          ? "tw-border-2 tw-border-green-600 tw-border-solid"
          : `tw-border-2 tw-border-red-600 tw-border-solid`
      }

    
      tw-bg-gradient-to-br from-blue-50 to-blue-100
      tw-rounded-xl 
      tw-shadow-lg 
      tw-p-4 
      tw-w-[260px] 
      tw-mx-auto 
      tw-space-y-4
      tw-transform transition-all duration-300 hover:tw-scale-105
    `}
          >
            <div className="tw-flex tw-justify-between tw-items-center tw-gap-3">
              <h3 className="tw-text-2xl tw-font-bold tw-text-gray-800">
                Network Check
              </h3>
              <div
                className={`
          tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center
          ${isNetworkOnline ? "tw-bg-green-100" : "tw-bg-red-100"}
        `}
              >
                {isNetworkOnline ? (
                  <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
                ) : (
                  <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>
                )}
              </div>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white tw-rounded-lg tw-p-3 tw-shadow-sm">
              <div className="tw-relative">
                <div className="tw-w-16 tw-h-16 tw-bg-blue-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <i className="fa-solid fa-wifi tw-text-blue-500 tw-text-3xl"></i>
                </div>
                {isNetworkOnline ? (
                  <i className="fas fa-check-circle tw-absolute tw-top-0 tw-right-0 tw-text-green-500 tw-bg-white tw-rounded-full tw-text-lg"></i>
                ) : (
                  <i className="fas fa-times-circle tw-absolute tw-top-0 tw-right-0 tw-text-red-500 tw-bg-white tw-rounded-full tw-text-lg"></i>
                )}
              </div>
              <div>
                <p className="tw-text-gray-700 tw-font-semibold">Network</p>
                <p className="tw-text-gray-500 tw-text-sm">
                  <span>
                  Speed : <TestNetworkSpeed/>
                  
                  </span>
                </p>
              </div>
            </div>

            <div
              className={`
        p-2 rounded-lg text-center font-medium
        ${
          isNetworkOnline
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        }
      `}
            >
              Status:{" "}
              {Number(Math.round(Network)) > 2 ? "Strong Speed" : "Weak Speed"}
            </div>
          </div>
        </div>

        <div className=" tw-flex tw-justify-center tw-mt-7 tw-flex-col tw-gap-4">

        {errorMsg.length === 0 ? ( <p className="tw-text-green-600 tw-m-auto tw-w-2/5 tw-bg-green-100 tw-border tw-border-green-400 tw-px-4 tw-py-2 tw-rounded-md tw-shadow-md">
    It is Mandatory to check Mic first , ✅ All systems are functioning properly.
  </p>):(
       errorMsg.map((msg)=>{
        return (<p className="tw-w-2/5 tw-m-auto tw-flex tw-items-center tw-gap-2 tw-bg-red-100 tw-text-red-700 tw-border tw-border-red-400 tw-px-4 tw-py-2 tw-rounded-md tw-shadow-md tw-animate-pulse">
      <svg
        className="tw-w-5 tw-h-5 tw-text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
        ></path>
      </svg>
      {msg}
    </p>)
       })   
    )}
        
          {isMicrophoneAvailable &&
          isWebcamAvailable &&
          isNetworkOnline &&
          isBrowserCompatible &&
          step >= 3 && transcript.length != 0? (
            <button
              onClick={clickhandle}
              className={`tw-bg-green-500 tw-px-8 tw-rounded-md tw-shadow-lg  tw-py-1 tw-border-0 tw-w-44 tw-m-auto`}
            >
              {" "}
              Proceed to test
            </button>
          ) : (
            <button
              onClick={clickhandle}
              className={`tw-bg-green-600 tw-px-8 tw-rounded-md tw-w-44 tw-m-auto tw-shadow-lg  tw-py-1 tw-border-0`}
              disabled
            >
              {" "}
              Proceed to test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemCheck;

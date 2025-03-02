import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import UAParser from "ua-parser-js";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // ✅ Check Browser Compatibility
  const checkBrowserCompatibility = () => {
    return new Promise((resolve) => {
      const parser = new UAParser();
      const browser = parser.getBrowser();
      const version = parseFloat(browser.version?.split(".")[0] || "0");

      setBrowserInfo({
        name: browser.name || "Unknown",
        version: version,
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
          "Unsupported browser. Please update or use Chrome/Firefox.",
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
        "Webcam access denied. Please allow webcam permission.",
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
        "Microphone access denied. Please allow microphone permission.",
      ]);
      setIsMicrophoneAvailable(false);
    }
  };

  const handleStartListening = () => {
    resetTranscript(); // Clear previous transcript
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    setIsAnimating(true)
    // Stop after 6 seconds
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsListening(false);
      setIsAnimating(false)
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
        const speed =
          typeof Network === "string" ? parseFloat(Network) : Network;
        console.log("Current network speed:", speed);

        // Set isNetworkOnline to true only if the speed is greater than 2.0 and the network is online
        if (!isNaN(speed) && speed > 2.0 && navigator.onLine) {
          setIsNetworkOnline(true);
          setErrorMsg((prev) =>
            prev.filter((msg) => !msg.includes("Internet is too slow"))
          );
        } else {
          setIsNetworkOnline(false);
          setErrorMsg((prev) => {
            if (!prev.includes("Internet is too slow")) {
              return [...prev, "Internet is too slow"];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Error checking network:", error);
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
        networkSpeed: Network,
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

      finalCheck,
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
          setErrorMsg((prev) => [
            ...prev,
            `Check ${i} failed: ${error.message}`,
          ]);
        }
      }
    };

    runChecks();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className=" tw-bg-white tw-p-8  tw-w-full">
        <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-4 tw-text-indigo-700">
          Checking System Requirements
        </h1>
        <div className="tw-max-w-3xl tw-mx-auto tw-px-3 tw-py-3">
  <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600 tw-mb-6">
    {step < steps.length
      ? `Step ${step}/${steps.length} · ${steps[step]}`
      : "✓ All checks complete!"}
  </h2>
  
  <div className="tw-relative tw-h-2 tw-bg-gray-100 dark:tw-bg-gray-800 tw-rounded-full tw-overflow-hidden tw-shadow-inner">
    <div 
      className="tw-absolute tw-top-0 tw-left-0 tw-h-full tw-bg-gradient-to-r tw-from-blue-500 tw-to-violet-600 tw-rounded-full tw-transition-all tw-duration-700 tw-ease-out"
      style={{ width: `${((step + 0.5) / steps.length) * 100}%` }}
    >
      {/* Shimmer effect using Tailwind only */}
      <div className="tw-absolute tw-inset-0 tw-flex">
        <div className="tw-w-1/2 tw-h-full tw-bg-gradient-to-r tw-from-transparent tw-via-white/30 tw-to-transparent tw-transform tw-translate-x-full tw-animate-[shimmer_2s_infinite]"></div>
      </div>
    </div>
  </div>
  
  <div className="tw-flex tw-justify-between tw-mt-3 tw-text-xs tw-text-gray-500 dark:tw-text-gray-400 tw-font-medium">
    <span>Start</span>
    <span>Complete</span>
  </div>
</div>


        <div className=" tw-flex tw-gap-5 tw-justify-between tw-flex-wrap tw-mt-5">
          {/* Browser Check */}
          <div 
  className={`tw-backdrop-blur-sm tw-bg-white/10 tw-rounded-2xl tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-out tw-transform hover:tw--translate-y-1 hover:tw-shadow-lg
    ${step === 0 ? "tw-ring-2 tw-ring-blue-400 tw-shadow-lg tw-shadow-blue-500/20" : 
      isBrowserCompatible ? "tw-ring-1 tw-ring-green-400" : "tw-ring-1 tw-ring-red-400"}`}
>
  <div className="tw-p-6">
    <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
      <div className="tw-flex tw-items-center">
       
        <h3 className="tw-text-lg tw-font-medium tw-text-black">Browser Check</h3>
      </div>
      <div className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center 
        ${isBrowserCompatible ? "tw-bg-green-500/20 tw-text-green-400" : "tw-bg-red-500/20 tw-text-red-400"}`}>
        {isBrowserCompatible 
          ? <i className="fa fa-check-circle tw-text-2xl"></i> 
          : <i className="fa fa-times-circle tw-text-2xl"></i>}
      </div>
    </div>

    <div className="tw-bg-gradient-to-br tw-from-indigo-900/40 tw-to-purple-900/40 tw-rounded-xl tw-p-4 tw-mb-5 tw-border tw-border-white/10">
   
      <div className="tw-flex tw-items-center tw-p-3">
        <div className="tw-w-12 tw-h-12 tw-bg-gradient-to-br tw-from-blue-500 tw-to-indigo-600 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-mr-4 tw-shadow-lg">
          <span className="tw-text-white tw-text-lg tw-font-bold">{browserInfo.name.charAt(0)}</span>
        </div>
        <div>
          <p className="tw-text-gray-600 tw-font-medium">{browserInfo.name}</p>
          <p className="tw-text-gray-600 tw-text-sm">Version: {browserInfo.version}</p>
        </div>
      </div>
  
 </div>
    
  
    
    <div className={`tw-rounded-xl tw-py-2 tw-px-4 tw-font-medium tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center
      ${isBrowserCompatible 
        ? "tw-bg-green-500/20 tw-text-green-500 tw-border tw-border-green-500/30" 
        : "tw-bg-red-500/20 tw-text-red-300 tw-border tw-border-red-500/30"}`}>
      {isBrowserCompatible 
        ? <i className="fa fa-check-circle tw-mr-2"></i> 
        : <i className="fa fa-times-circle tw-mr-2"></i>}
      <span>Browser {isBrowserCompatible ? "Compatible" : "Not Compatible"}</span>
    </div>
  </div>
</div>


          {/* Web Cam Check */}

          <div 
  className={`tw-backdrop-blur-sm tw-bg-white tw-rounded-2xl tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-out tw-transform hover:tw--translate-y-1 hover:tw-shadow-lg
    ${step === 1 ? "tw-ring-2 tw-ring-blue-400 tw-shadow-lg tw-shadow-blue-500/20" : 
      isWebcamAvailable ? "tw-ring-1 tw-ring-green-400" : "tw-ring-1 tw-ring-red-400"}`}
>
  <div className="tw-p-6">
    <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
      <div className="tw-flex tw-items-center">
      
        <h3 className="tw-text-lg tw-font-medium tw-text-black">Camera Check</h3>
      </div>
      <div className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center 
        ${isWebcamAvailable ? "tw-bg-green-500/20 tw-text-green-400" : "tw-bg-red-500/20 tw-text-red-400"}`}>
        {isWebcamAvailable 
          ? <i className="fa fa-check-circle tw-text-2xl"></i> 
          : <i className="fa fa-times-circle tw-text-2xl"></i>}
      </div>
    </div>
    
    <div className="tw-bg-gradient-to-br tw-from-indigo-900/40 tw-to-purple-900/40 tw-rounded-xl tw-p-6 tw-mb-4 tw-border tw-border-white/10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-36">
      <div className={`tw-w-16 tw-h-16 tw-rounded-full tw-bg-white/5  tw-flex tw-items-center tw-justify-center tw-mb-3 tw-border tw-border-white/10
        ${isWebcamAvailable ? "tw-shadow-lg tw-shadow-green-500/20" : ""}`}>
        <i className={`fa fa-camera tw-text-2xl ${isWebcamAvailable ? "tw-text-blue-400" : "tw-text-white"}`}></i>
      </div>
      <p className={`tw-font-medium tw-text-sm ${isWebcamAvailable ? "tw-text-white" : "tw-text-white"}`}>
        {isWebcamAvailable ? "Camera access granted" : "Camera access needed"}
      </p>
    </div>
    
    <div className={`tw-rounded-xl tw-py-2 tw-px-4 tw-font-medium tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center
      ${isWebcamAvailable 
        ? "tw-bg-green-200 tw-text-green-500 tw-border tw-border-green-500" 
        : "tw-bg-red-500 tw-text-red-300 tw-border tw-border-red-500"}`}>
      {isWebcamAvailable 
        ? <i className="fa fa-check-circle tw-mr-2 tw-text-xl"></i> 
        : <i className="fa fa-times-circle tw-mr-2 tw-text-xl"></i>}
      <span>Camera {isWebcamAvailable ? "Access Granted" : "Access Needed"}</span>
    </div>
  </div>
</div>

          {/* Mic check */}

          <div 
  className={`tw-backdrop-blur-sm tw-bg-white/10 tw-rounded-2xl tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-out tw-transform hover:-tw-translate-y-1 hover:tw-shadow-lg
    ${step === 2 ? "tw-ring-2 tw-ring-blue-400 tw-shadow-lg tw-shadow-blue-500/20" : 
      isMicrophoneAvailable ? "tw-ring-1 tw-ring-green-400" : "tw-ring-1 tw-ring-red-400"}`}
>
  <div className="tw-p-6">
    <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
      <div className="tw-flex tw-items-center">
       
        <h3 className="tw-text-lg tw-font-medium tw-text-black">Microphone Check</h3>
      </div>
      <div className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center 
        ${isMicrophoneAvailable ? "tw-bg-green-500/20 tw-text-green-400" : "tw-bg-red-500/20 tw-text-red-400"}`}>
        {isMicrophoneAvailable 
          ?  <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
          : <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>}
      </div>
    </div>
    
    <div className="tw-bg-gradient-to-br tw-from-indigo-900/40 tw-to-purple-900/40 tw-rounded-xl tw-p-4 tw-mb-4 tw-border tw-border-white/10">
      <div className="tw-flex tw-items-center tw-mb-3">
        <i className={`fa-solid fa-wave-square tw-h-5 tw-w-5 tw-mr-2 ${isAnimating ? "tw-text-purple-400" : "tw-text-white/60"}`}></i>
        <h4 className="tw-text-white tw-font-medium">Captured Audio</h4>
      </div>
      <div className="tw-bg-white/5 tw-backdrop-blur-sm tw-rounded-xl tw-p-3 tw-border tw-border-white/10 tw-min-h-16 tw-flex tw-items-center">
        {isAnimating && (
          <div className="tw-flex tw-items-center tw-space-x-1 tw-mx-auto">
            {[1, 2, 3, 4, 5].map((bar) => (
              <div 
                key={bar}
                className="tw-w-1 tw-bg-purple-400 tw-rounded-full tw-animate-pulse"
                style={{ 
                  height: `${Math.random() * 20 + 5}px`,
                  animationDelay: `${bar * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        )}
        {!isAnimating && transcript ? (
          <p className="tw-text-white/80">{transcript}</p>
        ) : !isAnimating ? (
          <p className="tw-text-white/40 tw-italic">Click "Test Mic" to begin...</p>
        ) : null}
      </div>
    </div>
    
    <button 
      onClick={handleStartListening}
      disabled={isListening}
      className={`tw-w-full tw-py-2.5 tw-rounded-xl tw-font-medium tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center
        ${isListening 
          ? "tw-bg-white/5 tw-text-white/40 tw-cursor-not-allowed tw-border tw-border-white/10" 
          : "tw-bg-gradient-to-r tw-from-blue-500 tw-to-indigo-600 tw-text-white hover:tw-shadow-lg hover:tw-shadow-blue-500/20 tw-border tw-border-blue-400/30"
        }`}
    >
      <i className={`fa-solid fa-microphone tw-w-4 tw-h-4 tw-mr-2 ${isListening ? "tw-animate-pulse" : ""}`}></i>
      {isListening ? "Listening..." : "Test Microphone"}
    </button>
  </div>
</div>

          {/* Network */}
          <div 
  className={`tw-backdrop-blur-sm tw-bg-white/10 tw-rounded-2xl tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-out tw-transform hover:-tw-translate-y-1 hover:tw-shadow-lg
    ${step === 3 ? "tw-ring-2 tw-ring-blue-400 tw-shadow-lg tw-shadow-blue-500/20" : 
      isNetworkOnline ? "tw-ring-1 tw-ring-green-400" : "tw-ring-1 tw-ring-red-400"}`}
>
  <div className="tw-p-6">
    <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
      <div className="tw-flex tw-items-center">
       
        <h3 className="tw-text-lg tw-font-medium tw-text-black">Network Check</h3>
      </div>
      <div className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center 
        ${isNetworkOnline ? "tw-bg-green-500/20 tw-text-green-400" : "tw-bg-red-500/20 tw-text-red-400"}`}>
        {isNetworkOnline 
          ?  <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
          : <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>}
      </div>
    </div>
    
    <div className="tw-bg-gradient-to-br tw-from-indigo-900/40 tw-to-purple-900/40 tw-rounded-xl tw-p-4 tw-mb-4 tw-border tw-border-white/10">
      <div className="tw-flex tw-mb-3 tw-p-3">
        <div className="tw-w-12 tw-h-12 tw-bg-gradient-to-br tw-from-cyan-500 tw-to-blue-600 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-mr-4 tw-shadow-lg">
        <i class="fa-solid fa-wifi"></i>
        </div>
        <div className=" tw-flex-col ">
          <p className="tw-text-gray-600 tw-font-medium">Network Speed</p>
          <div className="tw-flex tw-items-center tw-justify-center  tw-gap-3">
            <div className="tw-flex tw-items-end tw-space-x-0.5">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div 
                  key={bar}
                  className={`tw-w-1.5 tw-rounded-t-sm ${
                    bar <= Number(Math.round(Network))/2 ? "tw-bg-cyan-400" : "tw-bg-white/20"
                  }`}
                  style={{ height: `${4 + bar * 3}px` }}
                ></div>
              ))}
            </div>
            <p className=" tw-text-sm tw-font-medium tw-text-gray-600 tw-mt-2"><TestNetworkSpeed /></p>
          </div>
        </div>
      </div>
    </div>
    
    <div className={`tw-rounded-xl tw-py-2 tw-px-4 tw-font-medium tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center tw-gap-5
      ${isNetworkOnline 
        ? "tw-bg-green-500/20 tw-text-green-600 tw-border tw-border-green-500/30" 
        : "tw-bg-red-500/20 tw-text-red-300 tw-border tw-border-red-500/30"}`}>
      {isNetworkOnline 
        ? <i className="fas fa-check-circle tw-text-green-600 tw-text-2xl"></i>
        : <i className="fas fa-times-circle tw-text-red-600 tw-text-2xl"></i>}
      <span>{Number(Math.round(Network)) > 2  ? "Strong Connection" : "Weak Connection"}</span>
    </div>
  </div>
</div>

        </div>

        <div className="tw-flex tw-justify-center tw-mt-8 tw-flex-col tw-gap-5 tw-max-w-2xl tw-mx-auto">
  {errorMsg.length === 0 ? (
    <div className="tw-bg-emerald-50 tw-border tw-border-emerald-200 tw-rounded-lg tw-overflow-hidden tw-shadow-sm">
      <div className="tw-px-4 tw-py-3 tw-flex tw-items-center tw-gap-3">
        <span className="tw-flex-shrink-0 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-emerald-100">
          <svg className="tw-w-5 tw-h-5 tw-text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        {step === 3 ? (<p className="tw-text-emerald-700 tw-font-medium">
          <span className="tw-text-emerald-600">Great! All hardware checks passed. You're ready to proceed.</span>
        </p>):(<p className="text-yellow-700 font-medium">
        <span className="font-bold">Important:</span> It is mandatory to check your microphone first before proceeding.
      </p>)}
       
      </div>
    </div>
  ) : (
    <div className="tw-space-y-3">
      {errorMsg.map((msg, index) => (
        <div key={index} className="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-lg tw-overflow-hidden tw-shadow-sm">
          <div className="tw-px-4 tw-py-3 tw-flex tw-items-center tw-gap-3">
            <span className="tw-flex-shrink-0 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-red-100">
              <svg className="tw-w-5 tw-h-5 tw-text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
              </svg>
            </span>
            <p className="tw-text-red-700 tw-font-medium">{msg}</p>
          </div>
        </div>
      ))}
    </div>
  )}

  <div className="tw-mt-2 tw-flex tw-justify-center">
    {isMicrophoneAvailable &&
    isWebcamAvailable &&
    isNetworkOnline &&
    isBrowserCompatible &&
    step >= 3 &&
    transcript.length != 0 ? (
      <button
        onClick={clickhandle}
        className="tw-relative tw-px-6 tw-py-2.5 tw-bg-gradient-to-r tw-from-green-500 tw-to-emerald-600 tw-text-white tw-font-medium tw-rounded-lg tw-shadow-md hover:tw-shadow-lg tw-transform hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200 tw-overflow-hidden tw-group"
      >
        <span className="tw-relative tw-z-10">Proceed to Test</span>
        <span className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-white/20 tw-transform tw-scale-x-0 group-hover:tw-scale-x-100 tw-transition-transform tw-origin-left tw-duration-300"></span>
      </button>
    ) : (
      <button
        disabled
        className="tw-px-6 tw-py-2.5 tw-bg-gray-400 tw-text-white tw-font-medium tw-rounded-lg tw-shadow-sm tw-opacity-75 tw-cursor-not-allowed"
      >
        Proceed to Test
      </button>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default SystemCheck;

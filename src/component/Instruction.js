import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { ToastContainer, toast,Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Instruction = () => {
  const { id } = useParams();
  const Alltest = useSelector((store) => store.library.item);
  const userDetails = useSelector((store) => store.User.item);
  const [showModal, setShowModal] = useState(false);
  const [testQuestion, setTestQuestion] = useState([]);
  const [mobile ,setMobile] = useState(false)

  useEffect(() => {
    function isMobile() {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    const isMobileDevice = isMobile();
    setMobile(isMobileDevice);

    if (isMobileDevice) {
      toast.warn("you are not allowed to give test in a mobile", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  }, []);


  

  const navigate = useNavigate()
  useEffect(() => {
    if (userDetails?.invitedBy) {
      getTest();
    }
    else{
      getQuestion()
    }
  }, [userDetails]);

  async function getQuestion() {
    const Response = await fetch("http://localhost:8000/api/library");
    const data = await Response.json();
    const FilteredQuestions = data.filter((ele) => {
      return ele._id === id;
    });
    setTestQuestion(FilteredQuestions)
  }

  async function getTest() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/getcustomtest/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Fix: Use "include" instead of true
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTestQuestion(data.test); // Ensure setTestQuestion is defined
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  }

  const  handleFullscreen = ()=>{
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => navigate(`/verification/${id}`));
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
      navigate(`/verification/${id}`);
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Edge
      elem.webkitRequestFullscreen();
      navigate(`/verification/${id}`);
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
      navigate(`/verification/${id}`);
    } else {
      navigate(`/verification/${id}`); // Fallback if fullscreen is not supported
    }
    
  }



  return (
    <div className="tw-bg-[#F5F6F6] tw-overflow-visible tw-min-h-screen  tw-py-8 tw-px-4 lg:tw-px-16 tw-font-poppins">
      <ToastContainer/>
     
        <h1 className="tw-text-center tw-font-extrabold tw-text-2xl lg:tw-text-4xl tw-text-gray-800 tw-my-4">
          {testQuestion[0]?.name
           }
          &nbsp;:&nbsp;  {userDetails?.invitedBy ? "You are Invited to take this test" : "Test your preparation with our Assessment"} 
        </h1>
   <div className=" tw-flex md:tw-flex-row tw-flex-col">
        <div className="tw-flex tw-flex-col tw-gap-3 tw-p-6">
          <Link
            to="/test"
            className="tw-no-underline tw-px-10 tw-py-3 tw-rounded-md tw-shadow-md hover:tw-bg-green-500 tw-bg-[#31766A] tw-text-white tw-text-lg tw-w-60"
          >
            Back to Test Library
          </Link>

          <h4 className="tw-text-xl tw-font-semibold tw-text-gray-800">
            Description:
        </h4>

        <p className=" tw-text-md tw-text-slate-600"> { testQuestion[0]?.desc
              }</p>
        

          <h3 className="tw-text-xl tw-font-semibold tw-text-gray-800">
            Please carefully review the following instructions for the upcoming
            test:
          </h3>
          <ul className="tw-space-y-3">
            <li className="tw-text-md tw-text-slate-600">
              &nbsp;All questions are mandatory.
            </li>
            <li className="tw-text-md tw-text-slate-600">
              &nbsp;Ensure that your camera and microphone are turned on during
              the test, failure to do so will prevent you from proceeding.
            </li>
            <li className="tw-text-md tw-text-slate-600">
              &nbsp;You will be monitored hence movement is prohibited.
            </li>
            <li className="tw-text-md tw-text-slate-600">
              &nbsp;The test will start in full screen mode. Do not close or
              switch the tab during the test, closing it will automatically
              submit the test without saving your answers.
            </li>
            <li className="tw-text-md tw-text-slate-600">
              &nbsp;Ensure timely submission as you won't be able to submit the
              test after the deadline
            </li>
            <li className="tw-text-md tw-text-slate-600">
              &nbsp;Once you have completed the test, click on the "Submit"
              option to finalize your test submission.
            </li>
          </ul>
        </div>

        <div className="tw-flex tw-flex-col  tw-overflow-visible tw-justify-center tw-items-center tw-gap-6 tw-p-6 md:tw-mb-24">
          <div className="tw-flex md:tw-flex-row tw-flex-col tw-justify-center tw-items-center tw-gap-4 tw-mt-6">
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-white tw-rounded-tl-md tw-p-4 tw-shadow-md tw-w-64">
              <i className="fa-solid fa-file-lines tw-text-green-400 tw-text-4xl tw-p-2"></i>
              <h4 className="tw-text-md tw-font-medium">Type</h4>
              <p className="tw-text-gray-600">
                {testQuestion[0]?.part
                 }
              </p>
            </div>
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-white tw-rounded-tr-md tw-p-4 tw-shadow-md tw-w-64">
              <i className="fa-regular fa-clock tw-text-green-400 tw-text-4xl tw-p-2"></i>
              <h4 className="tw-text-md tw-font-medium">Time</h4>
              <p className="tw-text-gray-600">
                { testQuestion[0]?.time
                  }
              </p>
            </div>
          </div>

          <div className="tw-flex md:tw-flex-row tw-flex-col tw-justify-center tw-items-center tw-gap-4">
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-white tw-rounded-bl-md tw-p-4 tw-shadow-md tw-w-64">
              <i className="fa-regular fa-flag tw-text-green-400 tw-text-4xl tw-p-2"></i>
              <h4 className="tw-text-md tw-font-medium">Language</h4>
              <p className="tw-text-gray-600">English</p>
            </div>
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-white tw-rounded-br-md tw-p-4 tw-shadow-md tw-w-64">
              <i className="fa-solid fa-chart-simple tw-text-green-400 tw-text-4xl tw-p-2"></i>
              <h4 className="tw-text-md tw-font-medium">Level</h4>
              <p className="tw-text-gray-600">
                {testQuestion[0]?.level
                  }
              </p>
            </div>
          </div>
          <Link
  to={`/verification/${id}`}
  className={`tw-no-underline tw-px-10 tw-py-3 tw-rounded-md tw-shadow-md hover:tw-bg-green-500 tw-bg-[#31766A] tw-text-white tw-text-lg 
  tw-z-50 tw-relative tw-mt-6 ${mobile ? "tw-opacity-50" : ""}`}
>
  Get Started
</Link>
        </div>
        </div>
     


{showModal && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-max-w-sm tw-mx-4">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-4">
            📺 Enter Fullscreen Mode?
            </h3>
            <p className="tw-text-gray-600 tw-mb-6">
            "For the best experience, we recommend using fullscreen mode without it we cannot processed further"
            </p>

            <p className="tw-text-gray-900 tw-mb-6 tw-font-semibold">Would you like to enable fullscreen?"</p>
            <div className="tw-flex tw-justify-end tw-space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="tw-px-4 tw-py-2 tw-text-gray-600 hover:tw-text-gray-800 tw-rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleFullscreen}
                className="tw-px-4 tw-py-2 tw-bg-[#368e56] tw-text-white tw-rounded-md hover:tw-bg-[#24683f]"
              >
                 Go Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instruction;

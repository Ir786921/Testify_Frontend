import React, { useContext, useState } from "react";
import logo from "../assests/logo.png";
import Image1 from "../assests/Test_Your_Self-removebg-preview.png";
import Image2 from "../assests/Analysis-removebg-preview.png";
import Image3 from "../assests/progress2-removebg-preview.png";
import TestimonialSection from "./TestimonialSection";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import Faq from "../utils/Faq";
import Offerings from "./Offering";

import alltestContext from "../utils/Context";
import { useSelector } from "react-redux";

const Home = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredFeature, setHoveredFeature] = useState(null);
const userdetails = useSelector(store => store.User.IsLogin);
const navigate = useNavigate();

  const features = [
    {
      icon: <i className="fa-solid fa-user"></i>,
      title: "Smart Candidate Matching",
      description:
        "AI-powered matching to find the perfect candidates for your role",
    },
    {
      icon: <i className="fa-solid fa-clock"></i>,
      title: "Time-Saving Process",
      description: "Reduce hiring time by up to 50% with automated assessments",
    },
    {
      icon: <i className="fa-solid fa-star"></i>,
      title: "Quality Hiring",
      description: "Make data-driven decisions with comprehensive insights",
    },
    {
      icon: <i className="fa-solid fa-sack-dollar"></i>,
      title: "Free of Cost",
      description: "Do not need to pay single penny for high quality service.",
    },
  ];
  return (
    <div className="tw-container-fluid tw-bg-gray-50">
      {/* Hero Section */}
      <div className="tw-relative tw-overflow-hidden tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-600">
        <div className="tw-absolute tw-inset-0 tw-bg-grid-white/[0.2] tw-bg-grid-8"></div>
        <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-24 sm:tw-px-6 lg:tw-px-8">
          <div className="tw-text-center tw-space-y-8">
            <h1 className="tw-text-5xl tw-font-bold tw-text-white tw-tracking-tight sm:tw-text-6xl">
              Master Your Skills with
              <span className="tw-block tw-text-teal-200">
                Smart Assessments
              </span>
            </h1>
            <p className="tw-max-w-2xl tw-mx-auto tw-text-xl tw-text-gray-200">
              Advanced testing platform powered by AI to evaluate and enhance
              your technical expertise.
            </p>
            <div className="tw-flex tw-justify-center tw-gap-4">
              <button
              onClick={()=>{
                userdetails ? navigate("/test") : Swal.fire({
                                      title: "🔒 Access Restricted!",
                                      html: `<p class="tw-text-lg tw-font-semibold tw-text-white">You need to logIn to explore the library.</p>`,
                                      icon: "warning",
                                      timer: 5000,
                                      timerProgressBar: true,
                                      showConfirmButton: false,
                                      backdrop: `rgba(0,0,0,0.6)`,
                                      toast: false,
                                      position: "center",
                                      customClass: {
                                        popup:
                                          "tw-rounded-2xl tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-700 tw-shadow-xl",
                                        title: "tw-text-xl tw-font-bold tw-text-white",
                                        htmlContainer: "tw-text-center",
                                      },
                                    });
              }}
                
                className=" tw-no-underline tw-inline-flex tw-items-center tw-px-8 tw-py-3 tw-rounded-full tw-text-base tw-font-medium tw-text-white tw-bg-teal-500 hover:tw-bg-teal-400 tw-transition-all tw-shadow-lg hover:tw-shadow-xl tw-border-0"
              >
                Start Assessment
                <svg
                  className="tw-ml-2 tw-w-5 tw-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}

      <div>
        <Offerings />
      </div>

      <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-teal-50 tw-via-white tw-to-green-50 tw-p-5">
        {/* Animated Hero Section */}
        <div className="tw-text-center tw-p-8 tw-mt-5">
          <div className="tw-space-y-4">
            <h1 className="tw-text-4xl tw-font-bold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-green-600 tw-to-emerald-500">
              Hiring Made Easy and Free
            </h1>
            <p className="tw-text-gray-600 tw-max-w-2xl tw-mx-auto tw-text-lg">
              Building assessments is a breeze with Testify. Get started with
              these simple steps.
            </p>
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-8 tw-px-4 tw-mt-12">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`tw-bg-white tw-rounded-xl tw-p-8 tw-w-full sm:tw-w-1/3 tw-transform tw-transition-all tw-duration-300 tw-cursor-pointer
              ${
                activeStep === step
                  ? "tw-scale-105 tw-shadow-xl tw-border-2 tw-border-green-500"
                  : "tw-shadow-md hover:tw-shadow-lg"
              }
            `}
              onMouseEnter={() => setActiveStep(step)}
            >
              <div className="flex justify-center mb-6">
                {step === 1 && (
                  <i
                    className={`fa-solid fa-file tw-h-12 tw-w-12 tw-text-3xl ${
                      activeStep === step
                        ? "tw-text-green-500"
                        : "tw-text-green-600"
                    }`}
                  ></i>
                )}
                {step === 2 && (
                  <i
                    className={`fa-solid fa-paper-plane tw-h-12 tw-w-12 tw-text-3xl ${
                      activeStep === step
                        ? "tw-text-green-500"
                        : "tw-text-green-600"
                    }`}
                  ></i>
                )}
                {step === 3 && (
                  <i
                    className={`fa-solid fa-chart-bar tw-h-12 tw-w-12 tw-text-3xl ${
                      activeStep === step
                        ? "tw-text-green-500"
                        : "tw-text-green-600"
                    }`}
                  ></i>
                )}
              </div>
              <div className="tw-space-y-4">
                <h5 className="tw-text-xl tw-font-bold tw-text-center">
                  Step {step}
                </h5>
                <p className="tw-text-gray-700 tw-text-center tw-leading-relaxed">
                  {step === 1 &&
                    "Create high-quality assessments, fast. Select the tests that work for you and add custom questions."}
                  {step === 2 &&
                    "Invite candidates your way. Send invites via email, ATS, or a direct link."}
                  {step === 3 &&
                    "Analyze results and make decisions. Get real-time insights and compare candidates instantly."}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Features Section */}
        <div className="tw-max-w-6xl tw-mx-auto tw-mt-20 px-4">
          <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-12">
            Why Choose Testify?
          </h2>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="tw-relative tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-md tw-transition-all tw-duration-300 hover:tw-shadow-xl"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`tw-transition-transform tw-duration-300 ${
                    hoveredFeature === index
                      ? "tw-transform tw-translate-y-2"
                      : ""
                  }`}
                >
                  <div
                    className={`tw-flex items-center tw-gap-3 tw-mb-4 tw-text-green-600 ${
                      hoveredFeature === index ? "tw-text-green-500" : ""
                    }`}
                  >
                    <span> {feature.icon}</span>
                    <h3 className="tw-font-semibold tw-text-lg">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="tw-text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tw-py-10">
          <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-6">
            Individual can do
          </h1>
          <p className="tw-text-slate-700 tw-text-center tw-mb-5">
            find out what we are offering to Students.
          </p>
          <div className="tw-flex md:tw-flex-nowrap tw-flex-wrap tw-justify-center tw-gap-8 tw-p-5 ">
            {/* Feature 1 */}
            <div className="tw-bg-white tw-shadow-lg tw-p-6 tw-w-full sm:tw-w-1/3 tw-flex tw-flex-col tw-justify-center">
              <img
                className="tw-h-40 tw-mx-auto"
                src={Image1}
                alt="Test Yourself"
              />
              <h5 className="tw-text-xl tw-font-bold tw-mt-4 tw-text-center">
                Test Your Preparation
              </h5>
              <p className="tw-text-gray-700 tw-text-center tw-mt-2">
                Use our interactive quizzes to assess and enhance your knowledge
                and readiness.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-w-full sm:tw-w-1/3 tw-flex tw-flex-col tw-justify-center">
              <img
                className="tw-h-40 tw-mx-auto tw-align-middle"
                src={Image2}
                alt="Track Progress"
              />
              <h5 className="tw-text-xl tw-font-bold tw-mt-4 tw-text-center">
                Instant Results & Analytics:
              </h5>
              <p className="tw-text-gray-700 tw-text-center tw-mt-2">
                Detailed performance analytics to help you identify and improve
                weak areas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-w-full sm:tw-w-1/3 tw-flex tw-flex-col tw-justify-center">
              <img
                className="tw-h-40 tw-mx-auto"
                src={Image3}
                alt="Analyze Mistakes"
              />
              <h5 className="tw-text-xl tw-font-bold tw-mt-4 tw-text-center">
                Track Progress & Improve:
              </h5>
              <p className="tw-text-gray-700 tw-text-center tw-mt-2">
                Retake tests to monitor improvement and receive personalized
                suggestions to strengthen weak areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}

      <div className=" tw-py-10 tw-bg-gradient-to-br tw-from-green-50 tw-via-blue-50 tw-to-teal-50 tw-p-8">
        <h1 className="tw-text-center tw-text-2xl md:tw-text-4xl tw-font-extrabold tw-text-gray-900 tw-my-6 tw-tracking-wide  ">
          Our Test Include these Technology
        </h1>
        <p className="tw-text-slate-700 tw-text-center">
          Discover the wide range of technologies we support
        </p>
        <br />
        <InfiniteScroll />
        <h4 className=" tw-mt-10 tw-text-center tw-text-[16px] tw-font-semibold tw-text-gray-700">
          try it out Its free
        </h4>
        <div className=" tw-flex tw-justify-center">
          {" "}
          <button
           onClick={()=>{
            userdetails ? navigate("/test") : Swal.fire({
                                  title: "🔒 Access Restricted!",
                                  html: `<p class="tw-text-lg tw-font-semibold tw-text-white">You need to logIn to explore the library.</p>`,
                                  icon: "warning",
                                  timer: 5000,
                                  timerProgressBar: true,
                                  showConfirmButton: false,
                                  backdrop: `rgba(0,0,0,0.6)`,
                                  toast: false,
                                  position: "center",
                                  customClass: {
                                    popup:
                                      "tw-rounded-2xl tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-700 tw-shadow-xl",
                                    title: "tw-text-xl tw-font-bold tw-text-white",
                                    htmlContainer: "tw-text-center",
                                  },
                                });
          }}
            
            className="tw-bg-green-600 tw-text-white tw-font-semibold tw-px-8 tw-py-3 tw-rounded-md tw-shadow-md hover:tw-bg-green-700 tw-no-underline tw-mt-5"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="tw-bg-[#F9FAFB]">
        <TestimonialSection />
      </div>

      <div>
        <Faq />
      </div>
    </div>
  );
};

export default Home;

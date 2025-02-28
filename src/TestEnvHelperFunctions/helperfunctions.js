import Swal from "sweetalert2";
import React, { lazy, Suspense } from "react";
const LazyEditor = lazy(() => import("@monaco-editor/react"));
import "../app.css";
import Spinner from "../utils/Spinner";

const languages = {
  javascript: { id: 63, label: "JavaScript" },
  python: { id: 71, label: "Python" },
  cpp: { id: 54, label: "C++" },
  java: { id: 62, label: "Java" },
};
export const handleReset = async (currentQuestion, setUserResponses) => {
  // Show SweetAlert2 confirmation
  const result = await Swal.fire({
    title: "Reset Answer?",
    text: `Are you sure you want to reset your answer for Question ${currentQuestion}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#10B981", // Emerald-500
    cancelButtonColor: "#EF4444", // Red-500
    confirmButtonText: "Yes, reset it!",
    cancelButtonText: "Cancel",
    background: "#ffffff",
    borderRadius: "1rem",
    customClass: {
      title: "text-gray-800 font-semibold",
      popup: "rounded-xl shadow-xl border-2 border-emerald-100",
    },
  });

  // If confirmed, reset the answer
  if (result.isConfirmed) {
    setUserResponses((prev) => {
      const newResponses = { ...prev };
      // Only delete the current question's answer
      delete newResponses[currentQuestion];
      return newResponses;
    });

    // Show success message
    await Swal.fire({
      title: "Reset Complete!",
      text: "Your answer has been reset.",
      icon: "success",
      confirmButtonColor: "#10B981",
      timer: 1500,
      timerProgressBar: true,
      background: "#ffffff",
      borderRadius: "1rem",
      customClass: {
        popup: "rounded-xl shadow-xl border-2 border-emerald-100",
      },
    });
  }
};

export const renderProgrammingContent = (
  currentQuestion,
  currentQuestionData,
  selectedLanguage,
  activeTab,
  setActiveTab,
  testResults,
  setTestResults,
  loading,
  setLoading,
  setSelectedLanguage,
  handleCodeChange,
  handleEditorDidMount,
  handleLanguageChange,
  nextQuestion,
  runCode,
  code,
  setCode,
  isloading,
  totalQuestions
) => (
  <div className="tw-grid tw-grid-cols-2 tw-gap-6 tw-bg-gradient-to-br tw-from-[#f5f5f7] tw-to-[#e2e2e5]">
    {/* Left Panel - Question */}
    <div className="tw-bg-gradient-to-br tw-from-slate-800 tw-to-slate-900 tw-rounded-2xl tw-shadow-xl tw-border tw-border-slate-700 tw-overflow-y-auto tw-h-[550px] tw-hover:shadow-2xl tw-transition-shadow tw-duration-300 custom-scrollbar">
      <div className="tw-p-8 tw-space-y-8">
        {/* Question Header with enhanced styling */}
        <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-slate-700 tw-pb-6">
          <h3 className="tw-text-3xl tw-font-bold tw-text-slate-100 tw-tracking-tight">
            Question {currentQuestion}
          </h3>
          <span className="tw-px-4 tw-py-1.5 tw-bg-emerald-600 tw-text-emerald-100 tw-rounded-full tw-text-sm tw-font-semibold tw-tracking-wide tw-shadow-sm">
            Easy
          </span>
        </div>

        {/* Problem Statement with improved visuals */}
        <div className="tw-bg-slate-800 tw-p-6 tw-rounded-xl tw-shadow-sm tw-border tw-border-slate-700 tw-hover:border-emerald-600 tw-transition-colors tw-duration-300">
          <h4 className="tw-text-lg tw-font-bold tw-text-emerald-400 tw-mb-3 tw-flex tw-items-center tw-gap-2">
            <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full" />
            Problem Statement
          </h4>
          <p className="tw-text-slate-300 tw-leading-relaxed tw-text-lg">
            {currentQuestionData?.question}
          </p>
        </div>

        {/* Description with matching style */}
        <div className="tw-bg-slate-800 tw-p-6 tw-rounded-xl tw-shadow-sm tw-border tw-border-slate-700 tw-hover:border-emerald-600 tw-transition-colors tw-duration-300">
          <h4 className="tw-text-lg tw-font-bold tw-text-emerald-400 tw-mb-3 tw-flex tw-items-center tw-gap-2">
            <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full" />
            Description
          </h4>
          <p className="tw-text-slate-300 tw-leading-relaxed tw-text-lg">
            {currentQuestionData?.description}
          </p>
        </div>

        {/* Test Cases with enhanced visual hierarchy */}
        <div className="tw-bg-slate-800 tw-p-6 tw-rounded-xl tw-shadow-sm tw-border tw-border-slate-700 tw-hover:border-emerald-600 tw-transition-colors tw-duration-300">
          <h4 className="tw-text-lg tw-font-bold tw-text-emerald-400 tw-mb-4 tw-flex tw-items-center tw-gap-2">
            <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full" />
            Example Test Cases
          </h4>
          <div className="tw-space-y-4">
            {currentQuestionData?.testCases?.map((test, idx) => (
              <div
                key={idx}
                className="tw-bg-slate-700 tw-p-4 tw-rounded-lg tw-border tw-border-slate-600 tw-hover:border-emerald-600 tw-transition-all tw-duration-300 tw-hover:shadow-md"
              >
                <div className="tw-grid tw-grid-cols-2 tw-gap-6">
                  <div>
                    <span className="tw-text-sm tw-font-semibold tw-text-slate-400 tw-mb-2 tw-block">
                      Input:
                    </span>
                    <code className="tw-block tw-text-sm tw-bg-slate-800 tw-p-3 tw-rounded-lg tw-text-emerald-300 tw-font-mono tw-border tw-border-slate-700 tw-overflow-x-auto">
                      {Object.entries(test?.input || {}).map(([key, value]) => (
                        <li
                          className=" tw-list-none tw-inline tw-ml-3"
                          key={key}
                        >
                          {key} = {value}
                        </li>
                      ))}
                    </code>
                  </div>
                  <div>
                    <span className="tw-text-sm tw-font-semibold tw-text-slate-400 tw-mb-2 tw-block">
                      Output:
                    </span>
                    <code className="tw-block tw-text-sm tw-bg-slate-800 tw-p-3 tw-rounded-lg tw-text-emerald-300 tw-font-mono tw-border tw-border-slate-700 tw-overflow-x-auto">
                      {test?.Output}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Right Panel - Code Editor */}
    <div className="tw-bg-gradient-to-br tw-from-slate-800 tw-to-slate-900 tw-rounded-2xl tw-shadow-xl tw-border tw-border-slate-700 tw-overflow-y-auto tw-flex tw-flex-col tw-h-[550px] tw-hover:shadow-2xl tw-transition-shadow tw-duration-300 custom-scrollbar">
      {/* Header Section with Select and Buttons */}
      <div className="tw-p-4 tw-border-b tw-border-slate-700 tw-flex tw-items-center tw-justify-between">
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="tw-px-3 tw-py-2 tw-bg-slate-800 tw-border tw-border-slate-600 tw-rounded-md tw-text-sm tw-font-medium tw-text-slate-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-emerald-500 tw-transition-colors tw-duration-300"
        >
          {Object.entries(languages).map(([key, value]) => (
            <option
              key={key}
              value={key}
              className="tw-w-full tw-px-4 tw-py-3 tw-text-sm tw-bg-slate-800 tw-text-slate-300 tw-cursor-pointer hover:tw-bg-emerald-600 hover:tw-text-white tw-transition-colors tw-duration-300"
            >
              {value?.label}
            </option>
          ))}
        </select>
        <div className="tw-flex tw-gap-4">
        <div className="tw-flex tw-items-center">
    <button
      onClick={runCode}
      className="tw-bg-emerald-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-medium hover:tw-bg-emerald-700 tw-transition-colors tw-duration-300"
    >
      Run Code
    </button>

    {isloading && (
      <div className="tw-ml-4 tw-w-6 tw-h-6 tw-border-4 tw-border-t-4 tw-border-solid tw-border-emerald-600 tw-border-t-transparent tw-rounded-full tw-animate-spin"></div>
    )}
  </div>
          <button
            onClick={nextQuestion}
            disabled={currentQuestion === totalQuestions}
            className={`tw-px-4 tw-py-2 tw-rounded-md tw-font-medium tw-transition-colors tw-duration-300 
          ${
            currentQuestion === totalQuestions
              ? "tw-bg-slate-700 tw-text-slate-500 tw-cursor-not-allowed"
              : "tw-bg-emerald-600 tw-text-white hover:tw-bg-emerald-700"
          }`}
          >
            Submit & Next
          </button>
        </div>
      </div>

      {/* Editor Section */}
      <div className="tw-flex-1 tw-h-[300px] tw-overflow-y-auto tw-border-t tw-border-slate-700">
        <Suspense
          fallback={
            <div className="tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-slate-800">
              <div className="tw-animate-pulse tw-text-slate-500">
                Loading Editor...
              </div>
            </div>
          }
        >
          <LazyEditor
            height="270px"
            defaultValue={`// Write your code here`}
            language={selectedLanguage}
            value={code[currentQuestion] || ""}
            onChange={(newCode) => handleCodeChange(newCode, currentQuestion)}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              automaticLayout: true,
              quickSuggestions: true,
              snippetSuggestions: "top",
              tabCompletion: "on",
              padding: { top: 16, bottom: 16 },
            }}
            onMount={handleEditorDidMount}
          />
        </Suspense>

        {/* Tab Section */}
        <h4 className="tw-text-base tw-font-semibold tw-text-slate-300 tw-mb-2 tw-p-1 tw-bg-slate-700">
          Test Result
        </h4>

      

        {testResults.length === 0 ? (<div className="tw-bg-slate-800 tw-text-center tw-p-6 tw-rounded-lg tw-shadow-md tw-border tw-border-slate-600 tw-mt-6 tw-w-3/4 tw-mx-auto">
  <h2 className="tw-text-2xl tw-font-semibold tw-text-slate-300">
    Please run code first
  </h2>
  <p className="tw-text-sm tw-text-slate-500 tw-mt-2">
    Execute your code to see the test results.
  </p>
</div>): (  <div className="tw-flex tw-space-x-4 tw-border-b tw-border-slate-600 tw-shadow-md tw-p-2 tw-gap-12">
          {currentQuestionData?.testCases?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors tw-duration-300 tw-w-20 tw-rounded-md
          ${
            activeTab === index
              ? "tw-bg-emerald-700 tw-text-white tw-border-b-2 tw-border-emerald-500"
              : "tw-text-slate-400 hover:tw-bg-slate-800"
          }`}
            >
              Case {index + 1}
            </button>
          ))}
        </div> )}
       

        {/* Test Case Details */}
         {!isloading && currentQuestionData?.testCases?.length > 0 &&
          testResults?.length > 0 &&
          testResults[activeTab] && (
            <div className="tw-mt-6 tw-px-6 tw-py-4 tw-bg-slate-800 tw-rounded-lg tw-shadow-sm tw-border tw-border-slate-700">
              <div className="tw-text-lg tw-font-semibold tw-text-emerald-400">
                {currentQuestionData?.testCases[activeTab]?.Output ==
                testResults[activeTab]?.stdout[activeTab] ? (
                  <h3
                    className={`${
                      currentQuestionData?.testCases[activeTab]?.Output ==
                        testResults[activeTab]?.stdout[activeTab] &&
                      "tw-text-emerald-500"
                    }`}
                  >
                    Accepted
                  </h3>
                ) : (
                  <h3
                    className={` ${
                      currentQuestionData?.testCases[activeTab]?.Output !=
                        testResults[activeTab]?.stdout[activeTab] &&
                      "tw-text-red-500"
                    }`}
                  >
                    Rejected 
                  </h3>
                )}
              </div>

              {/* Input and Expected Output Section */}
              <div className="tw-mt-4">
                <div className="tw-mb-4">
                  <div className="tw-text-sm tw-font-medium tw-text-slate-400">
                    Input:
                  </div>
                  <pre className="tw-bg-slate-900 tw-p-4 tw-rounded-md tw-font-mono tw-text-sm tw-text-emerald-400 tw-border tw-border-slate-700">
                    {Object.entries(
                      currentQuestionData?.testCases[activeTab]?.input || {}
                    ).map(([key, value]) => (
                      <li className=" tw-list-none tw-inline tw-ml-3" key={key}>
                        {key} = {value}
                      </li>
                    ))}
                  </pre>
                </div>

                <div className="tw-mb-4">
                  <div className="tw-text-sm tw-font-medium tw-text-slate-400">
                    Expected Output:
                  </div>
                  <pre className="tw-bg-slate-900 tw-p-4 tw-rounded-md tw-font-mono tw-text-sm tw-text-emerald-400 tw-border tw-border-slate-700">
                    {currentQuestionData?.testCases[activeTab]?.Output ||
                      "No expected output provided"}
                  </pre>
                </div>

                <div>
                  <div className="tw-text-sm tw-font-medium tw-text-slate-400">
                    Actual Output:
                  </div>
                  <pre
                    className={`tw-bg-slate-900 tw-p-4 tw-rounded-md tw-font-mono tw-text-sm ${
                      currentQuestionData?.testCases[activeTab]?.Output ==
                      testResults[activeTab]?.stdout[activeTab]
                        ? "tw-text-emerald-400"
                        : "tw-text-red-500 tw-border"
                    } tw-border-slate-700`}
                  >
                    {testResults[activeTab]?.stdout[activeTab] ||
                      "No actual output provided"}
                  </pre>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  </div>
);

export const renderMCQContent = (
  currentQuestion,
  currentQuestionData,
  userResponses,
  handleReset,
  setUserResponses,
  onOptionSelect,
  handleOptionSelect
) => (
  <div
    className="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-6 tw-p-6 tw-bg-gradient-to-br tw-from-[#0f1c2c] tw-to-[#1b2a3b] tw-bg-opacity-90 tw-bg-pattern-stripes tw-bg-pattern-opacity-5 tw-bg-pattern-size-[10px_10px]
"
  >
    <div className="tw-bg-white tw-rounded-xl tw-shadow-lg hover:tw-shadow-xl tw-transition-all tw-duration-300 tw-border-t-4 tw-border-t-emerald-500 tw-backdrop-blur-lg tw-bg-opacity-90">
      <div className="tw-p-8">
        <div className="tw-space-y-6">
          <div className="tw-flex tw-items-center tw-gap-4">
            <span className="tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-600 tw-text-white tw-font-bold tw-text-lg tw-shadow-lg tw-shadow-emerald-200">
              {currentQuestion}
            </span>
            <h3 className="tw-text-2xl tw-font-bold tw-bg-gradient-to-r tw-from-emerald-600 tw-to-green-600 tw-bg-clip-text tw-text-transparent">
              Question
            </h3>
          </div>
          <p className="tw-text-gray-700 tw-text-lg tw-font-medium">
            {currentQuestionData?.question}
          </p>
        </div>
      </div>
    </div>

    <div className="tw-bg-white tw-rounded-xl tw-shadow-lg hover:tw-shadow-xl tw-transition-all tw-duration-300 tw-border-t-4 tw-border-t-green-500 tw-backdrop-blur-lg tw-bg-opacity-90">
      <div className="tw-p-8">
        <div className="tw-space-y-8">
          <div className="tw-flex tw-items-center tw-justify-between">
            <span className="tw-text-base tw-font-semibold tw-text-emerald-700 tw-bg-emerald-50 tw-px-4 tw-py-2 tw-rounded-lg">
              Choose your answer
            </span>
            <button
              onClick={() => handleReset(currentQuestion, setUserResponses)}
              disabled={!userResponses[currentQuestion]}
              className={`tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-red-600 tw-bg-red-50 tw-rounded-lg 
            tw-transition-all tw-duration-200 tw-transform hover:tw-scale-105 active:tw-scale-95
            ${
              !userResponses[currentQuestion]
                ? "tw-opacity-50 tw-cursor-not-allowed"
                : "hover:tw-bg-red-100 active:tw-bg-red-200"
            }`}
            >
              <svg
                className="tw-w-4 tw-h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Reset
            </button>
          </div>

          <div className="tw-space-y-4">
            {currentQuestionData?.options?.map((option, idx) => {
              const isSelected = userResponses[currentQuestion] === option;
              return (
                <label
                  key={idx}
                  className={`tw-flex tw-items-center tw-gap-4 tw-p-5 tw-rounded-xl tw-border-2 tw-cursor-pointer tw-transition-all tw-duration-300 tw-transform hover:-tw-translate-y-1 
                ${
                  isSelected
                    ? "tw-border-emerald-500 tw-bg-gradient-to-r tw-from-emerald-50 tw-to-green-50 tw-shadow-lg tw-shadow-emerald-100"
                    : "tw-border-gray-200 hover:tw-border-emerald-200 hover:tw-bg-emerald-50/30"
                }`}
                >
                  <div
                    className={`tw-w-6 tw-h-6 tw-rounded-full tw-border-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 
                ${
                  isSelected
                    ? "tw-border-emerald-500 tw-bg-emerald-100"
                    : "tw-border-gray-300"
                }`}
                  >
                    <div
                      className={`tw-w-3 tw-h-3 tw-rounded-full tw-transition-all tw-duration-300 
                  ${
                    isSelected
                      ? "tw-bg-emerald-500 tw-scale-100"
                      : "tw-bg-transparent tw-scale-0"
                  }`}
                    />
                  </div>
                  <input
                    type="radio"
                    name={`question_${currentQuestion}`}
                    value={option}
                    checked={isSelected}
                    onChange={() => onOptionSelect(option, idx)}
                    className="tw-sr-only"
                  />
                  <span
                    className={`tw-flex-1 tw-text-lg tw-transition-colors tw-duration-300 
                ${
                  isSelected
                    ? "tw-text-emerald-900 tw-font-semibold"
                    : "tw-text-gray-700"
                }`}
                  >
                    {option}
                  </span>
                  {isSelected && (
                    <span className="tw-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-bg-emerald-500 tw-rounded-full tw-animate-fade-in">
                      <svg
                        className="tw-w-4 tw-h-4 tw-text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
);

import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import * as monaco from "monaco-editor";
import axios from "axios";
import Dropdown from "./UI/dropdown";
import { handleReset } from "../TestEnvHelperFunctions/helperfunctions";
import {
  renderProgrammingContent,
  renderMCQContent,
} from "../TestEnvHelperFunctions/helperfunctions";
import { transformSections } from "../TestEnvHelperFunctions/TransformedObject";
import CountdownTimer from "./Timer";
import { handleSubmitAnswer } from "../TestEnvHelperFunctions/SubmitAnswer.js";
import trackUserResponse from "../TestEnvHelperFunctions/TrackResponse.js";
import { setTestId } from "../Redux/librarySlice.js";
import Detection from "./Detection.js";

const TestEnv = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [testQuestion, setTestQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [sectionQuestions, setsectionQuestions] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [currentSectionQuestions, setCurrentSectionQuestions] = useState(
    selectedSection ? sectionQuestions[selectedSection] : []
  );
  const [startTimes, setStartTimes] = useState({});
  const userDetails = useSelector((store) => store.User.item);
  const [testName, setTestName] = useState(" ");
  const [unAttempted, setUnAttempted] = useState(0);

  const [Time, setTime] = useState(0);
  const dispatch = useDispatch();
  const [isStudent, setIsStudent] = useState(
    userDetails?.invitedBy ? true : false
  );
  const [testID, setTestID] = useState(id);


  useEffect(() => {
    isStudent ? getTest() : getQuestion();
    dispatch(setTestId(testID));
  }, [userDetails]);

  useEffect(() => {
    // Capture the start time when the user views the question
    const isProgramming =
      isStudent &&
      currentSectionQuestions &&
      currentSectionQuestions[0]?.type === "programming";
    const questionKey = isProgramming
      ? `programming-${currentQuestion}`
      : `Q-${currentQuestion}`;
    if (!startTimes[questionKey]) {
      const startTime = performance.now(); // Capture the start time (in ms)
      setStartTimes((prevState) => ({
        ...prevState,
        [questionKey]: startTime,
      }));
    }
  }, [currentQuestion, currentSectionQuestions]);

  useEffect(() => {
    const transformedQuestions = transformSections(testQuestion[0]?.sections);
    setsectionQuestions(transformedQuestions);
  }, [testQuestion]);

  useEffect(() => {
    setCurrentSectionQuestions(sectionQuestions[selectedSection]);
  }, [selectedSection]);

  useEffect(() => {
    if (isStudent && testQuestion[0]?.sections[0]?.name) {
      setSelectedOption(testQuestion[0].sections[0]?.name);
      setSelectedSection(testQuestion[0]?.sections[0]?.name);
    }
  }, [testQuestion]);

  async function getQuestion() {
    const Response = await fetch("http://localhost:8000/api/library");
    const data = await Response.json();
    const FilteredQuestions = data.filter((ele) => {
      return ele._id === id;
    });
    const Questions = FilteredQuestions[0]?.questions;
    const updatedData = Questions?.map((item, index) =>
      Object.assign({}, item, { id: index + 1 })
    );

    setTestQuestion(updatedData);
    setTestName(FilteredQuestions[0]?.name);
    setTime(parseInt(FilteredQuestions[0]?.time));
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
     

      setTestQuestion(data?.test);
      setTestName(data?.test[0]?.name);
      setTime(data?.test[0]?.duration);
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  }

  const handleCountdownComplete = () => {
    console.log("⏳ Time is up!");
  };



  const [isAnswer, setIsAnswer] = useState("");
  // const [selectedSection, setSelectedSection] = useState(sectionName && sectionName);
  const [startIndex, setStartIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  // const currentSectionQuestions = questions[selectedSection];
  // console.log(currentSectionQuestions);

  const totalQuestions = isStudent
    ? currentSectionQuestions && currentSectionQuestions?.length
    : testQuestion.length;
 

  const currentQuestionData = isStudent
    ? currentSectionQuestions && currentSectionQuestions[currentQuestion - 1]
    : testQuestion[currentQuestion - 1];
  const visibleQuestions = 5;
  const [enquiry, setEnquiry] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [code, setCode] = useState({});
  const [testResults, setTestResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editorRef = useRef(null);

  const history = useNavigate();

  const detectionRef = useRef();

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Ensure the selected language is registered
    monaco.languages.register({ id: selectedLanguage });

    // Check if TypeScript is available before using its defaults
    if (monaco.languages.typescript) {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    }

    // Auto-completion configuration
    monaco.languages.registerCompletionItemProvider(selectedLanguage, {
      provideCompletionItems: (model, position) => {
        const suggestions = [
          {
            label: "log",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "console.log(${1:message})",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ];
        return { suggestions };
      },
    });
  };

  const languages = {
    javascript: { id: 63, label: "JavaScript" },
    python: { id: 71, label: "Python" },
    cpp: { id: 54, label: "C++" },
    java: { id: 62, label: "Java" },
  };

  useEffect(() => {
    if (Object.keys(userResponses).length !== 0 && !userResponses.hasOwnProperty(currentQuestion)) {
      setUnAttempted((prev) => prev + 1);
    }
  }, [userResponses, currentQuestion]);

  // Sample data structure

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section) => {
    setCurrentQuestion(1);
    setStartIndex(0);
    setSelectedOption(section);
    setDropDown(false);
    setSelectedSection(section);
  };

  const handleCodeChange = (newCode, questionIndex) => {
    const isProgramming =
      isStudent &&
      currentSectionQuestions &&
      currentSectionQuestions[0]?.type === "programming";
    const questionKey = isProgramming && `programming-${currentQuestion}`;
    const endTime = Date.now();
    const startTime = startTimes[questionKey];
    const responseTime = Number(((endTime - startTime) / 1000).toFixed(2));

    setCode((prevCode) => ({
      ...prevCode,
      [questionIndex]: newCode.toString(),
    }));
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionKey]: {
        answer: isProgramming ? code[currentQuestion] : value,
        responseTime: responseTime,
      },
    }));
  };
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);

  const handleOptionSelect = (event, idx) => {
    const { value } = event.target;
    const endTime = performance.now(); // Record the end time when user submits answer

    // Determine the start time based on section-wise or non-section-wise test
    const isProgramming =
      isStudent &&
      currentSectionQuestions &&
      currentSectionQuestions[0]?.type === "programming";
    const questionKey = isProgramming
      ? `programming-${currentQuestion}`
      : `Q-${currentQuestion}`;

    const startTime = startTimes[questionKey];
    const responseTime = Number(((endTime - startTime) / 1000).toFixed(2));

    // Store user responses
    setUserResponses((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));

    // Store answers based on question type and test type
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionKey]: {
        answer: isProgramming ? code[currentQuestion] : value,
        responseTime: responseTime,
      },
    }));
  };

  const wrapUserCode = (code) => {
    if (typeof code !== "string") {
      throw new TypeError("Expected code to be a string.");
    }

    // Extract function name dynamically (assuming the function has a simple name and signature)
    const functionNameMatch = code.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : null;

    if (!functionName) {
      throw new Error(
        "No valid function declaration found in the user's code."
      );
    }

    // Inject test case inputs into the wrapped code as stdin
    const arr = currentQuestionData.testCases.map((tc) => {
      return `${JSON.stringify(tc.input)}`; // You don't need to join these as a string, just process individually
    }); // Convert input to a string format for Judge0

    return `
      ${code}  // ⬅️ Insert user's function

    // Helper function to process input
    function processInput(line) {
      try {
        // Directly return the input without parsing (assuming the format is correct)
        return line;
      } catch (error) {
        console.error("Invalid input format", error);
        return null;
      }
    }

    // Loop through the stdin inputs and execute the function for each test case
    ${arr
      .map((input, index) => {
        return `
        (function() {
          let parsedInput = processInput(${input});  // Process the input
          if (parsedInput) {
            const keys = Object.keys(parsedInput);
            if (keys.length === 1) {
              const value = parsedInput[keys[0]];
              console.log(${functionName}(value));  // Call the user's function with one argument
            } else if (keys.length === 2) {
              const value1 = parsedInput[keys[0]];
              const value2 = parsedInput[keys[1]];
              console.log(${functionName}(value1, value2));  // Call the user's function with two arguments
            } else {
              console.log("Input does not match expected structure.");
            }
          }
        })();
      `;
      })
      .join("\n")}  // Ensure each test case gets its own separate output
    `;
  };

 

  const runCode = async () => {
    setLoading(true);
    try {
      const wrappedCode = wrapUserCode(code[currentQuestion]);

      // ✅ 1. Send Batch Request to Judge0 API
      const submissions = currentQuestionData.testCases.map((tc) => ({
        source_code: wrappedCode,
        language_id: languages[selectedLanguage].id,
        stdin: JSON.stringify(tc.input),
      }));

    

      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions/batch",
        { submissions },
        {
          headers: {
            "X-RapidAPI-Key":
              "0ad8a7d1b5mshedd92016a3372bbp1e0b59jsn9452c5c7caf1",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );

      const tokens = response.data.map((item) => item.token); // Extract tokens
      console.log("Submission Tokens:", tokens);

      // ✅ 2. Poll API Until Execution is Complete for Each Token
      let results = [];

      for (let token of tokens) {
        let result = null;
        while (true) {
          const res = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status`,
            {
              headers: {
                "X-RapidAPI-Key":
                  "0ad8a7d1b5mshedd92016a3372bbp1e0b59jsn9452c5c7caf1",
              },
            }
          );

          result = res.data;
          if (result.status.id >= 3) break; // ✅ Status 3+ means execution finished

          console.log(`Waiting for execution of token: ${token}`);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // ✅ Wait 2 seconds before retrying
        }

        results.push({
          token,

          stdout: result.stdout
            ? result.stdout
                .trim()
                .split("\n")
                .map((item) => JSON.parse(item))
            : "",
          stderr: result.stderr ? result.stderr.trim() : "",
          status: result.status.description,
        });
      }

      // ✅ 3. Process & Display Results
      setTestResults(results);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      console.log("Execution Results:", results);
    } catch (error) {
      console.error(
        "Execution Error:",
        error.response ? error.response.data : error
      );
    }
    setLoading(false);
  };

  const onOptionSelect = (option, idx) => {
    handleOptionSelect(
      {
        target: {
          value: option,
        },
      },
      idx
    );
  };

  const submitTest = async () => {
    // Check if detectionRef exists and has stopRecording method
    if (
      detectionRef.current &&
      typeof detectionRef.current.stopRecording === "function"
    ) {
      detectionRef.current.stopRecording();
    }
    const response = handleSubmitAnswer(
      testQuestion,
      isStudent,
      selectedAnswers,
      startTimes,
      currentSectionQuestions,
      currentQuestion
    );
    console.log(response);

    const sentToBackend = {
      title: testName,
      candidateName: userDetails?.FullName || null,
      CandidateEmail: userDetails?.Email || null,
      CandidateId: userDetails?._id || null,
      testId: id,
      unAttempted: unAttempted,
      isSection: response.sectionWise,
      response: isStudent
        ? response.response.reduce((acc, section) => {
            const sectionData = section.response.map((item) => ({
              currentQuestion: item?.currentQuestion,
              questionId: item?.questionId,
              answer: item?.response,

              timeSpent: item?.timeSpent,
              // Include section name if section-wise
            }));

            // Group responses by section
            acc[section?.section] = sectionData;
            return acc;
          }, {})
        : response.response.map((item) => ({
            currentQuestion: item?.currentQuestion,
            questionId: item?.questionId,
            answer: item?.response?.answer,
            responseTime: item?.response?.responseTime,
            timeSpent: item?.timeSpent,
          })),
    };

    try {
      const Response = await fetch("http://localhost:8000/api/userresponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sentToBackend),
      });

      const data = await Response.json();
      console.log(data);
    } catch (error) {
      console.log("something went wrong", error);
    }

    console.log(sentToBackend);

    history("/submit", { replace: true });
  };

  const endIndex = Math.min(
    startIndex + visibleQuestions,
    isStudent ? currentSectionQuestions?.length : testQuestion.length
  );
  const visibleQuestionsList = isStudent
    ? currentSectionQuestions?.slice(startIndex, endIndex)
    : testQuestion.slice(startIndex, endIndex);

  const nextQuestion = () => {
    if (startIndex + visibleQuestions < totalQuestions) {
      setStartIndex((prev) => prev + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
    setCurrentQuestion(currentQuestion - 1);
  };

  function isAnswered() {
    return Object.keys(userResponses).length;
  }



  return (
    <div className="tw-bg-slate-50 tw-min-h-screen">
      {/* Header */}
      <header className="tw-bg-slate-900 tw-text-white tw-p-2 md:tw-fixed tw-w-full tw-top-0 tw-z-50">
        <div className="tw-container tw-mx-auto tw-flex md:tw-flex-row tw-flex-col tw-justify-between tw-items-center">
          <div className="tw-flex md:tw-flex-row tw-flex-col tw-items-center tw-space-x-4">
            <h1 className="tw-text-xl tw-font-bold">Testify</h1>
            <span className="tw-text-slate-400">|</span>
            <h2 className="tw-text-sm tw-text-slate-300">{testName}</h2>
          </div>
          <div className="tw-flex md:tw-flex-row tw-flex-col tw-items-center tw-space-x-10 tw-gap-5">
            <div className=" tw-flex tw-flex-col tw-items-center">
              <span>{userDetails?.FullName}</span>{" "}
              <span>{userDetails?.Email}</span>
            </div>
            <span>
              <CountdownTimer
                initialMinutes={Time}
                onComplete={handleCountdownComplete}
              />
            </span>
            <button variant="primary" onClick={submitTest}>
              Finish Test
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="tw-w-full tw-bg-white tw-border-b tw-p-2 md:tw-fixed tw-top-16 tw-z-40">
        <div className="tw-container tw-mx-auto tw-flex md:tw-flex-row tw-flex-col tw-justify-between tw-items-center">
          {isStudent && (
            <div className="tw-relative tw-w-64">
              <button
                className={`tw-flex tw-items-center tw-justify-between tw-w-full tw-px-4 tw-py-3 tw-text-sm tw-font-medium 
          ${
            dropDown
              ? "tw-bg-green-50 tw-text-green-700 tw-border-green-500"
              : "tw-bg-white tw-text-gray-700 tw-border-gray-300"
          } 
          tw-border tw-rounded-lg hover:tw-bg-green-50 hover:tw-border-green-500 hover:tw-text-green-700 
          focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 focus:tw-ring-opacity-50 
          tw-transform tw-transition-all tw-duration-200 tw-ease-in-out hover:tw-scale-[1.02]`}
                onClick={() => setDropDown(!dropDown)}
              >
                <span>{selectedOption}</span>
                <i
                  className={`fa-solid fa-chevron-down tw-w-4 tw-h-4 tw-transition-transform tw-duration-300 tw-ease-in-out ${
                    dropDown
                      ? "tw-rotate-180 tw-text-green-600"
                      : "tw-text-gray-400"
                  }`}
                />
              </button>

              <div
                className={`tw-absolute tw-w-full tw-mt-2 tw-transition-all tw-duration-300 tw-ease-in-out tw-transform 
        ${
          dropDown
            ? "tw-opacity-100 tw-scale-100 tw-translate-y-0"
            : "tw-opacity-0 tw-scale-95 tw-translate-y-2 tw-pointer-events-none"
        }`}
              >
                <div className="tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
                  {testQuestion[0]?.sections?.map((item) => {
                    return (
                      <p
                        className="tw-w-full tw-px-4 tw-py-3 tw-text-sm tw-text-left tw-text-gray-700 tw-cursor-pointer
              hover:tw-bg-green-50 hover:tw-text-green-700 
              tw-transition-colors tw-duration-200 tw-border-b tw-border-gray-100
              tw-transform hover:tw-scale-[1.01] tw-hover:pl-6"
                        onClick={() => handleSectionChange(item?.name)}
                      >
                        {item?.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="tw-flex tw-items-center tw-space-x-6 tw-bg-white tw-p-4">
            <span className="tw-font-semibold tw-text-gray-700">Legends:</span>

            <div className="tw-flex tw-items-center tw-space-x-2">
              <button className="tw-w-7 tw-h-7 tw-rounded-md tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-500"></button>
              <span className="tw-text-gray-600">Answered</span>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-2">
              <button className="tw-w-7 tw-h-7 tw-rounded-md tw-bg-gray-300"></button>
              <span className="tw-text-gray-600">Not Answered</span>
            </div>
          </div>

          <div className="tw-flex tw-items-center tw-justify-center tw-space-x-6 tw-p-4">
            {/* Previous Button */}
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 1}
              className={`tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-rounded-lg tw-border-2 tw-font-medium tw-transition-all tw-duration-200
      ${
        currentQuestion === 1
          ? "tw-border-gray-200 tw-text-gray-400 tw-cursor-not-allowed"
          : "tw-border-emerald-500 tw-text-emerald-600 hover:tw-bg-emerald-50 active:tw-bg-emerald-100 hover:tw-shadow-md"
      }`}
            >
              <svg
                className="tw-w-5 tw-h-5 tw-mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            {/* Question Number Buttons */}
            <div className="tw-flex tw-items-center tw-space-x-2">
              {visibleQuestionsList?.map((q) => {
                const isActive = currentQuestion === q?.id;
                return (
                  <button
                    key={q?.id}
                    onClick={() => setCurrentQuestion(q?.id)}
                    className={`tw-w-10 tw-h-10 tw-rounded-lg tw-font-semibold tw-transition-all tw-duration-200 tw-transform hover:tw-scale-105
            ${
              isActive
                ? "tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-500 tw-text-white tw-shadow-lg tw-shadow-emerald-200"
                : "tw-border-2 tw-border-gray-200 tw-text-gray-600 hover:tw-border-emerald-300 hover:tw-bg-emerald-50 hover:tw-text-emerald-600"
            } ${
                      userResponses.hasOwnProperty(q?.id) &&
                      "tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-500 tw-text-white"
                    }`}
                  >
                    {q?.id}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === totalQuestions}
              className={`tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-rounded-lg tw-border-2 tw-font-medium tw-transition-all tw-duration-200
      ${
        currentQuestion === totalQuestions
          ? "tw-border-gray-200 tw-text-gray-400 tw-cursor-not-allowed"
          : "tw-border-emerald-500 tw-text-emerald-600 hover:tw-bg-emerald-50 active:tw-bg-emerald-100 hover:tw-shadow-md"
      }`}
            >
              Next
              <svg
                className="tw-w-5 tw-h-5 tw-ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* <div className="tw-flex tw-items-center tw-space-x-4">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 1}>
              Previous
            </Button>
            <div className="tw-flex tw-space-x-2">
              {currentSectionQuestions.slice(startIndex, startIndex + visibleQuestions).map((q) => (
                <button
                  key={q.id}
                  className={`tw-w-8 tw-h-8 tw-rounded-md tw-flex tw-items-center tw-justify-center ${
                    currentQuestion === q.id
                      ? 'tw-bg-blue-600 tw-text-white'
                      : 'tw-border tw-border-gray-300'
                  }`}
                  onClick={() => setCurrentQuestion(q.id)}
                >
                  {q.id}
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={nextQuestion} disabled={currentQuestion === totalQuestions}>
              Next
            </Button>
          </div> */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="tw-container tw-mx-auto md:tw-pt-40 tw-p-2">
        {isStudent &&
        currentSectionQuestions &&
        currentSectionQuestions[0]?.type === "programming"
          ? renderProgrammingContent(
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
              isLoading,
              totalQuestions
            )
          : renderMCQContent(
              currentQuestion,
              currentQuestionData,
              userResponses,
              handleReset,
              setUserResponses,
              onOptionSelect,
              handleOptionSelect
            )}
      </main>

      {/* Monitoring Notice */}
      <div className=" tw-flex tw-justify-center">
        <div className="tw-fixed tw-bottom-4 tw-right-4 tw-bg-red-100 tw-p-2 tw-rounded-lg tw-shadow-lg tw-z-50">
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-relative">
              <div className="tw-w-3 tw-h-3 tw-bg-red-500 tw-rounded-full tw-animate-ping tw-absolute"></div>
              <div className="tw-w-3 tw-h-3 tw-bg-red-500 tw-rounded-full tw-relative"></div>
            </div>
            <p className="tw-text-red-700">You are being monitored</p>
            <Detection cloudinaryImageUrl  = {userDetails?.Verificationimage}  />
          </div>
        </div>

        <div className=" tw-flex md:tw-flex-row tw-flex-col tw-justify-center">
          <span className="tw-mt-5 tw-text-lg tw-font-semibold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-emerald-400 tw-to-emerald-600 tw-shadow-sm">
            {parseInt((isAnswered() / totalQuestions) * 100)}% &nbsp; Compleated
            &nbsp;
          </span>

          <div className="tw-relative tw-w-[450px] tw-h-4 tw-bg-gray-800 tw-rounded-lg tw-overflow-hidden tw-shadow-md tw-mt-6">
            {/* Progress Fill */}
            <div
              className="tw-h-full tw-bg-gradient-to-r tw-from-emerald-500 tw-to-emerald-600 tw-rounded-lg tw-transition-all tw-duration-500 tw-ease-in-out"
              style={{
                width: `${parseInt((isAnswered() / totalQuestions) * 100)}%`,
              }}
            ></div>

            {/* Glow Effect */}
            <div className="tw-absolute tw-inset-0 tw-bg-emerald-400 tw-opacity-10 tw-blur-md"></div>
          </div>
          <span className=" tw-mt-5">
            {" "}
            &nbsp;{" "}
            <span className="tw-mt-5 tw-text-lg tw-font-semibold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-emerald-400 tw-to-emerald-600 tw-shadow-sm">
              {" "}
              {isAnswered()}{" "}
            </span>{" "}
            /{" "}
            <span className="tw-text-gray-400 tw-text-lg tw-font-semibold">
              {totalQuestions}
            </span>{" "}
          </span>
        </div>

        <div
          className=" tw-fixed tw-bottom-6 tw-left-6 tw-bg-white tw-shadow-xl tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-bg-red-500 hover:tw-text-white tw-p-3"
          onMouseEnter={() => setEnquiry(true)}
          onMouseLeave={() => setEnquiry(false)}
        >
          {!enquiry && (
            <i className="fa-solid fa-circle-question tw-text-4xl tw-text-red-500 tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-scale-110"></i>
          )}

          {enquiry && (
            <div
              className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4 tw-absolute tw-bottom-14 tw-left-0 tw-min-w-[250px] tw-text-gray-800 tw-text-sm tw-font-medium tw-transition-all tw-duration-300 tw-ease-in-out tw-opacity-0 tw-scale-95"
              style={{
                opacity: enquiry ? 1 : 0,
                transform: enquiry ? "scale(1)" : "scale(0.95)",
              }}
            >
              <p className="tw-text-lg tw-font-semibold tw-mb-2">
                Need Help? ❓
              </p>
              <p>We're here to assist you.</p>
              <p className="tw-mt-2">
                📧 <b>Email:</b> support@example.com
              </p>
              <p>
                📞 <b>Call:</b> +91 98765 43210
              </p>
              <p className="tw-mt-2 tw-text-xs tw-text-gray-500">
                Available 24/7
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestEnv;

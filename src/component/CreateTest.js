import React, { useContext, useState } from "react";
import SuccessModal from "./UI/SuccessModal";
import { useDispatch } from "react-redux";
import { addTest } from "../Redux/CreatedTestSlice";

const TestCreator = () => {

  const dispatch = useDispatch();



  // Test Details State - removed useSections
  const [testDetails, setTestDetails] = useState({
    name: "",
    duration: "",
    description: "",
    level : ""
  });



  // Sections State with questionType
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Section 1",
      questionType: "MCQ",
      questions: [
        {
          id: 1,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    },
  ]);

  // UI States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const[showTestModal,setShowTestModal] = useState(false);
  const[statusCode,setStatusCode] = useState(0);
  const[dbResponse,setDbResponse] = useState([]);
  const [deleteInfo, setDeleteInfo] = useState({
    type: null,
    sectionId: null,
    questionId: null,
  });

  // Handlers
  const generateUniqueId = () => Date.now() + Math.random();

  const handleTestDetailsChange = (e) => {
    const { name, value } = e.target;
    setTestDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionTypeChange = (sectionId, newType) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questionType: newType,
              questions:
                newType === "Programming"
                  ? [
                      {
                        id: 1,
                        question: "",
                        description: "",
                        testCases: [],
                      },
                    ]
                  : [
                      {
                        id: 1,
                        question: "",
                        options: ["", "", "", ""],
                        correctAnswer: "",
                      },
                    ],
            }
          : section
      )
    );
  };

  const handleQuestionChange = (
    questionId,
    field,
    value,
    optionIndex = null,
    sectionId = null
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((q) => {
              if (q.id === questionId) {
                if (field === "options") {
                  const newOptions = [...q.options];
                  newOptions[optionIndex] = value;
                  return { ...q, options: newOptions };
                }
                return { ...q, [field]: value };
              }
              return q;
            }),
          };
        }
        return section;
      })
    );
  };

  const addTestCase = (e,questionId, sectionId) => {
    e.preventDefault()
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                if (!question.testCases || question.testCases.length < 2) {
                  const newTestCase = {
                    id: generateUniqueId(),
                    input: null,
                    output: null,
                  };
                  return {
                    ...question,
                    testCases: [...(question.testCases || []), newTestCase],
                  };
                }
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleTestCaseChange = (
    questionId,
    testCaseId,
    field,
    value,
    sectionId
  ) => {
    const isNumber = !isNaN(value);
   
    console.log(isNumber);
    
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  testCases: (question.testCases || []).map((testCase) =>
                    testCase.id === testCaseId
                      ? { ...testCase, [field]:    value }
                      : testCase
                  ),
                };
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const addSection = (e) => {
    e.preventDefault()
    const newSectionId = Math.max(...sections.map((s) => s.id)) + 1;
    setSections((prev) => [
      ...prev,
      {
        id: newSectionId,
        name: `Section ${newSectionId}`,
        questionType: "MCQ",
        questions: [
          {
            id: 1,
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ],
      },
    ]);
  };

  const addQuestion = (e,sectionId) => {
    e.preventDefault()
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newId = Math.max(...section.questions.map((q) => q.id), 0) + 1;
          return {
            ...section,
            questions: [
              ...section.questions,
              section.questionType === "Programming"
                ? {
                    id: newId,
                    question: "",
                    description: "",
                    testCases: [],
                  }
                : {
                    id: newId,
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                  },
            ],
          };
        }
        return section;
      })
    );
  };

  const handleDelete = () => {
    if (deleteInfo.type === "section") {
      setSections((prev) => prev.filter((s) => s.id !== deleteInfo.sectionId));
    } else if (deleteInfo.type === "question") {
      setSections((prev) =>
        prev.map((section) => {
          if (section.id === deleteInfo.sectionId) {
            return {
              ...section,
              questions: section.questions.filter(
                (q) => q.id !== deleteInfo.questionId
              ),
            };
          }
          return section;
        })
      );
    }
    setShowDeleteModal(false);
  };

  const createTest = async (e) => {

    e.preventDefault();
    // Sample test data
    const testData = {
      name: testDetails.name,
      desc: testDetails.description,
      duration: testDetails.duration,
      icon:testDetails.name.substring(0,1),
      level:testDetails.level,
      sections: sections.map((section) => ({
        name: section.name,
        questionType: section.questionType,
        questions: section.questions.map((question) => {
          if (section.questionType === "MCQ") {
            return {
              question: question.question,
              options: question.options,
              correctAnswer: question.correctAnswer,
            };
          } else if (section.questionType === "Programming") {
            return {
              question: question.question,
              description: question.description,
              testCases: question.testCases.map((testCase) => ({
                input: testCase.input,
                output: testCase.output,
              })),
            };
          }
          return question; // Return question as-is if more types are added
        }),
      })),
    };

   
    if(testDetails.name && testDetails.duration && testDetails.description){
      try {
       
        const response = await fetch("http://localhost:8000/api/customtest", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testData),
        });

      
        setStatusCode(response.status)


        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to create test");
        }
  
        const data = await response.json();
        setDbResponse(data)
        dispatch(addTest(data.test))
        console.log("Test created successfully:", data);
      } catch (error) {
        setDbResponse(error)
      }

    }
    

   

    if(testDetails.name && testDetails.duration && testDetails.description){
      setShowTestModal(true)
    }

   
  };

  return (
    <div className="tw-w-full tw-min-h-screen tw-p-4 tw-bg-gray-50">
    <form action="">
      <div className="tw-w-full tw-mx-auto tw-flex">
        <div className="tw-mb-6 tw-border tw-rounded-lg tw-bg-white tw-w-[25%]">
          <div className="tw-border-b tw-p-4">
            <h1 className="tw-text-lg tw-font-bold">Test Configuration</h1>
          </div>
          <div className="tw-p-6 tw-space-y-4">
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Test Name
              </label>
              <input
                type="text"
                name="name"
                value={testDetails.name}
                onChange={handleTestDetailsChange}
                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                required
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={testDetails.duration}
                onChange={handleTestDetailsChange}
                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                required
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={testDetails.description}
                onChange={handleTestDetailsChange}
                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                Select level of difficulty
              </label>
              <select
                name="level"
                value={testDetails.level}
                onChange={handleTestDetailsChange}
                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                rows="4"
                required
              >
              <option value="select">Select Any Option</option>  
              <option value="Easy">Easy</option> 
                <option value="Intermediate">Intermediate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="tw-space-y-6 tw-w-[75%] tw-ml-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="tw-p-6 tw-border tw-rounded-lg tw-bg-white"
            >
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <h2 className="tw-text-xl tw-font-semibold">{section.name}</h2>
                <div className="tw-flex tw-items-center tw-space-x-4">
                  <select
                    value={section.questionType}
                    onChange={(e) =>
                      handleQuestionTypeChange(section.id, e.target.value)
                    }
                    className="tw-p-2 tw-border tw-rounded-md"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Programming">Programming</option>
                  </select>
                  {sections.length > 1 && (
                    <button
                      onClick={() => {
                        setDeleteInfo({
                          type: "section",
                          sectionId: section.id,
                        });
                        setShowDeleteModal(true);
                      }}
                      className="tw-text-red-500 hover:tw-text-red-700"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>

              {section.questionType === "Programming" ? (
                <div className="tw-space-y-4">
                  {section.questions.map((question, qIndex) => (
                    <div
                      key={question.id}
                      className="tw-p-4 tw-bg-gray-50 tw-rounded-lg"
                    >
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                        <h4 className="tw-font-medium">
                          Programming Question {qIndex + 1}
                        </h4>
                        {section.questions.length > 1 && (
                          <span
                            onClick={() => {
                              setDeleteInfo({
                                type: "question",
                                sectionId: section.id,
                                questionId: question.id,
                              });
                              setShowDeleteModal(true);
                            }}
                            className="tw-text-red-500 hover:tw-text-red-700 tw-text-2xl"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </span>
                        )}
                      </div>
                      <div className="tw-space-y-4">
                        <div>
                          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                            Question Title
                          </label>
                          <input
                            type="text"
                            value={question.question}
                            onChange={(e) =>
                              handleQuestionChange(
                                question.id,
                                "question",
                                e.target.value,
                                null,
                                section.id
                              )
                            }
                            className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            placeholder="Enter programming question title"
                          />
                        </div>
                        <div>
                          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                            Description
                          </label>
                          <textarea
                            value={question.description}
                            onChange={(e) =>
                              handleQuestionChange(
                                question.id,
                                "description",
                                e.target.value,
                                null,
                                section.id
                              )
                            }
                            className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            rows="4"
                            placeholder="Enter question description"
                          />
                        </div>
                        <div className="tw-flex tw-flex-col">
                          {(question.testCases || []).map((testCase) => (
                            <div key={testCase.id} className="tw-my-2">
                              <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                Test Case{" "}
                                {question.testCases.indexOf(testCase) + 1}
                              </label>
                              <input
                              type="text"
                                value={testCase.input}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    question.id,
                                    testCase.id,
                                    "input",
                                    e.target.value,
                                    section.id
                                  )
                                }
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                                rows="2"
                                placeholder="Enter Test Case Input"
                              />
                              <input
                              type="text"
                                value={testCase.output}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    question.id,
                                    testCase.id,
                                    "output",
                                    e.target.value,
                                    section.id
                                  )
                                }
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md mt-2"
                                rows="2"
                                placeholder="Enter Test Case Output"
                              />
                            </div>
                          ))}
                        </div>
                        {(!question.testCases ||
                          question.testCases.length < 2) && (
                          <button
                            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
                            onClick={(e) => addTestCase(e,question.id, section.id)}
                          >
                            Add Test Case
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={(e) => addQuestion(e,section.id)}
                    className="tw-w-full tw-p-2 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-text-gray-600 hover:tw-bg-gray-50"
                  >
                    Add Question
                  </button>
                </div>
              ) : (
                <div className="tw-space-y-4">
                  {section.questions.map((question, qIndex) => (
                    <div
                      key={question.id}
                      className="tw-p-4 tw-bg-gray-50 tw-rounded-lg"
                    >
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                        <h4 className="tw-font-medium">
                          Question {qIndex + 1}
                        </h4>
                        {section.questions.length > 1 && (
                          <span
                            onClick={() => {
                              setDeleteInfo({
                                type: "question",
                                sectionId: section.id,
                                questionId: question.id,
                              });
                              setShowDeleteModal(true);
                            }}
                            className="tw-text-red-500 hover:tw-text-red-700 tw-text-2xl"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </span>
                        )}
                      </div>
                      <div className="tw-space-y-2">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "question",
                              e.target.value,
                              null,
                              section.id
                            )
                          }
                          className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                          placeholder="Enter question"
                          required
                        />
                        {question.options.map((option, index) => (
                          <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleQuestionChange(
                                question.id,
                                "options",
                                e.target.value,
                                index,
                                section.id
                              )
                            }
                            className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            placeholder={`Option ${index + 1}`}
                            required
                          />
                        ))}
                        <input
                          type="text"
                          value={question.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "correctAnswer",
                              e.target.value,
                              null,
                              section.id
                            )
                          }
                          className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                          placeholder="Correct answer"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={(e) => addQuestion(e,section.id)}
                    className="tw-w-full tw-p-2 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-text-gray-600 hover:tw-bg-gray-50"
                  >
                  <i className="fa-solid fa-circle-plus"></i> &nbsp;
                    Add Question
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={(e)=> addSection(e)}
            className="tw-w-full tw-p-3 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-text-gray-600 hover:tw-bg-gray-50"
          >
          <i className="fa-solid fa-circle-plus"></i> &nbsp;
            Add New Section
          </button>
          <button type="submit" className=" tw-flex tw-gap-2 tw-items-center tw-float-right tw-mr-10 tw-px-6 tw-py-2 tw-rounded-md hover:tw-bg-green-500 tw-bg-green-600 tw-text-white tw-font-medium"
          onClick={ (e)=>
            createTest(e)
          }>
           <i className="fa-solid fa-save"></i>
            Save test
          </button>
        </div>
      </div>
      </form>

      {showTestModal && <SuccessModal isOpen = {showTestModal} onClose = {()=>{
        setShowTestModal(false)
      }} text = {dbResponse} code = {statusCode}/>}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-max-w-sm tw-mx-4">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-4">
              Delete {deleteInfo.type === "section" ? "Section" : "Question"}
            </h3>
            <p className="tw-text-gray-600 tw-mb-6">
              Are you sure you want to delete this {deleteInfo.type}? This
              action cannot be undone.
            </p>
            <div className="tw-flex tw-justify-end tw-space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="tw-px-4 tw-py-2 tw-text-gray-600 hover:tw-text-gray-800 tw-rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="tw-px-4 tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-md hover:tw-bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCreator;

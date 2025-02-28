import React, { useState } from "react";
import faq from "../assests/file.png";

const Section = ({ question, answer, isvisible, setIsvisible }) => {
  return (
    <div
      className=" tw-bg-white tw-w-4/5 tw-p-2 tw-rounded-md hover:tw-shadow-lg tw-shadow-md tw-cursor-pointer"
      onClick={() => {
        setIsvisible(true);
      }}
    >
      {" "}
      <h4 className="tw-inline-block tw-text-black tw-ml-5 tw-font-semibold tw-text-[16px] tw-items-center tw-mt-1">
        {question}
      </h4>{" "}
      <span className="tw-text-white tw-float-right tw-mr-5 tw-mt-1 tw-mb-1 tw-flex tw-rounded-full tw-items-center tw-bg-[#02BAD2] tw-p-2">
        {isvisible ? (
          <i
            className="fa-solid fa-minus tw-text-md"
            onClick={() => {
              setIsvisible(false);
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-plus tw-text-white tw-text-md"></i>
        )}
      </span>
      <br />
      {isvisible && <p className="tw-text-gray-500 tw-ml-5">{answer}</p>}
    </div>
  );
};

const Faq = () => {
  const [sectionconfig, setSectionconfig] = useState({
    Q1: false,
    Q2: false,
    Q3: false,
    Q4: false,
    Q5: false,
    Q6:false
  });
  return (
    <div className="tw-p-6 tw-bg-gradient-to-br tw-from-teal-50 tw-via-[#c9e9ed] tw-to-white ">
<h1 className="tw-text-center tw-text-2xl md:tw-text-4xl tw-font-extrabold tw-text-gray-900 tw-my-6 tw-tracking-wide">
    Frequently Asked Questions
</h1>

      <br />
      <div className=" tw-flex md:tw-flex-row tw-flex-col tw-p-3  tw-gap-10">
        <div className="md:tw-w-1/2 tw-w-full tw-flex tw-flex-col tw-gap-6 tw-items-center">
          {" "}
          <Section
            question={"What is Tesify?"}
            answer={
              "Tesify is an advanced online assessment platform that allows recruiters,students to create, share, and analyze custom tests."
            }
            isvisible={sectionconfig.Q1}
            setIsvisible={() => {
              setSectionconfig({
                Q1: !sectionconfig.Q1,
                Q2: false,
                Q3: false,
                Q4: false,
                Q5: false,
                Q6:false
              });
            }}
          />
          <Section
            question={"How are test results calculated and displayed?"}
            answer={
              "The system uses AI-powered analysis to calculate scores, generate performance insights, and provide AI-driven feedback."
            }
            isvisible={sectionconfig.Q2}
            setIsvisible={() => {
              setSectionconfig({
                Q1: false,
                Q2: !sectionconfig.Q2,
                Q3: false,
                Q4: false,
                Q5: false,
                Q6:false
              });
            }}
          />
          <Section
            question={"Can I customize the test difficulty and duration?"}
            answer={
              "Yes, you can select difficulty levels (Easy, Medium, Hard) and set a custom time limit for each test."
            }
            isvisible={sectionconfig.Q3}
            setIsvisible={() => {
              setSectionconfig({
                Q1: false,
                Q2: false,
                Q3: !sectionconfig.Q3,
                Q4: false,
                Q5: false,
                Q6:false
              });
            }}
          />
          <Section
            question={"Does the platform support anti-cheating measures?"}
            answer={
              "Yes, it includes webcam monitoring, audio analysis, tab-switch detection, and a warning system to prevent cheating."
            }
            isvisible={sectionconfig.Q4}
            setIsvisible={() => {
              setSectionconfig({
                Q1: false,
                Q2: false,
                Q3: false,
                Q4: !sectionconfig.Q4,
                Q5: false,
                Q6:false
              });
            }}
          />
          <Section
            question={"Who can use Tesify?"}
            answer={
              "Tesify is designed for recruiters, educators, and organizations to assess candidates, as well as students preparing for exams."
            }
            isvisible={sectionconfig.Q5}
            setIsvisible={() => {
              setSectionconfig({
                Q1: false,
                Q2: false,
                Q3: false,
                Q4: false,
                Q5: !sectionconfig.Q5,
                Q6:false

              });
            }}
          />
           <Section
            question={" Can I use pre-built tests instead of creating my own?"}
            answer={
              "Yes! Tesify offers a library of 100+ pre-built tests across various domains that you can use instantly."
            }
            isvisible={sectionconfig.Q6}
            setIsvisible={() => {
              setSectionconfig({
                Q1: false,
                Q2: false,
                Q3: false,
                Q4: false,
                Q5: false,
                Q6:!sectionconfig.Q6
              });
            }}
          />
        </div>
        <div className=" md:tw-w-1/2 tw-w-full  tw-p-4">
          <div className=" tw-flex tw-flex-col tw-justify-center tw-items-center">
            <img
              src={faq}
              alt=""
              width={250}
              className=" tw-ml-24"
            />
            <h3 className=" tw-font-bold">Any Question ?</h3>
            <p className=" tw-text-slate-3">You can ask you want to know about</p>
            <div className=" tw-flex tw-flex-col tw-p-2 tw-w-full">
            <label htmlFor="Question" className=" tw-ml-10  md:tw-ml-16 tw-mb-2">Let Me Know</label>
            
            <input type="text" className=" tw-w-[80%] tw-m-auto tw-rounded-md tw-p-2  tw-border tw-border-solid tw-mt-1 tw-border-black tw-opacity-60" placeholder="Enter here..." />
            </div>
            <button className=" tw-mt-5 tw-rounded-xl tw-shadow-xl tw-shadow-[#02BAD2] tw-px-10 tw-py-1 tw-bg-[#02BAD2] tw-text-white tw-border-none">Sent</button>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Faq;

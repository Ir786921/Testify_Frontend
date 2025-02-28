import React, { useState } from "react";

const Dropdown = () => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Section");

  const handleSectionChange = (section) => {
    setSelectedOption(
      section === "mcq" ? "MCQ Section" : "Programming Section"
    );
    setDropDown(false);
  };
  return (
    <div className="tw-relative tw-w-64">
      <button
        className={`tw-flex tw-items-center tw-justify-between tw-w-full tw-px-4 tw-py-3 tw-text-sm tw-font-medium 
          ${
            dropDown
              ? "tw-bg-green-50 tw-text-green-700 tw-border-green-500"
              : "tw-bg-white tw-text-gray-700 tw-border-gray-300"
          } 
          tw-border tw-rounded-lg tw-hover:bg-green-50 tw-hover:border-green-500 tw-hover:text-green-700 
          tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-green-500 tw-focus:ring-opacity-50 
          tw-transform tw-transition-all tw-duration-200 tw-ease-in-out tw-hover:scale-[1.02]`}
        onClick={() => setDropDown(!dropDown)}
      >
        <span>{selectedOption}</span>
        <i className={`fa-solid fa-chevron-down tw-w-4 tw-h-4 tw-transition-transform tw-duration-300 tw-ease-in-out ${dropDown ? 'tw-rotate-180 tw-text-green-600' : 'tw-text-gray-400'}`} />
      
      </button>

      <div
        className={`tw-absolute tw-w-full tw-mt-2 tw-transition-all tw-duration-300 tw-ease-in-out tw-transform 
        ${
          dropDown
            ? "tw-opacity-100 tw-scale-100 tw-translate-y-0"
            : "tw-opacity-0 tw-scale-95 tw--translate-y-2 tw-pointer-events-none"
        }`}
      >
        <div className="tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
          <button
            className="tw-w-full tw-px-4 tw-py-3 tw-text-sm tw-text-left tw-text-gray-700 
              tw-hover:bg-green-50 tw-hover:text-green-700 
              tw-transition-colors tw-duration-200 tw-border-b tw-border-gray-100
              tw-transform tw-hover:scale-[1.01] tw-hover:pl-6"
            onClick={() => handleSectionChange("mcq")}
          >
            MCQ Section
          </button>
          <button
            className="tw-w-full tw-px-4 tw-py-3 tw-text-sm tw-text-left tw-text-gray-700 
              tw-hover:bg-green-50 tw-hover:text-green-700 
              tw-transition-colors tw-duration-200
              tw-transform tw-hover:scale-[1.01] tw-hover:pl-6"
            onClick={() => handleSectionChange("programming")}
          >
            Programming Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

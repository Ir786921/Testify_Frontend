import React, { Component, useContext, useEffect, useRef, useState } from "react";

import TestCard from "./TestCard";


import { Link, useLocation, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Shimmer from "./Shimmer";
const TestLib = () => {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allTest, setAllTest] = useState([]);
  const [testid, setTestid] = useState(" ");
  const [showCard, SetShowCard] = useState([]);
  const [bedcrum, setBedcrum] = useState("All Test");
  const userTest = useSelector((Store) => Store.CreateTest.item);
  const [test, setTest] = useState([]);
  const [filteredTest, setFilteredTest] = useState([]); 

  const isLogin = useSelector((Store) => Store.User.IsLogin);

  const UserDetails = useSelector((Store) => Store.User.item);

  console.log(test);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllTest();
    if (isLogin) {
      getYourTest()
    }
  }, [isLogin,searchText]);

  async function getYourTest() {
  try {
    const Response = await fetch(
      `http://localhost:8000/api/getcustomtest/${UserDetails?._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        credentials: "include",
      }
    );

  const data = await Response.json();

  setTest(data.test);
  } catch (error) {
    console.log(error);
    
  }

  }

  async function getAllTest() {
    const data = await fetch("http://localhost:8000/api/library");
    const response = await data?.json();
   
    
    if (searchText.trim() === "") {
      setAllTest([...response]); // Reset if search is empty
    } 
    
    else
    {const filteredData = allTest.filter((test) =>
      test.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setAllTest(filteredData); }
  }

  function linkClicked(id) {
    setShowModal(true);
    setFormData((prevState) => ({
      ...prevState,
      testId: id,
    }));
  }

  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    message: "",
    Expired: "",
    MobileNo: "",
    testId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const Response = await fetch("http://localhost:8000/api/share", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const message = await Response.json();
      console.log(message);

      setShowModal(false);
      setFormData(" ");
    } catch (error) {
      alert(error);
    }
  };

  const OptionSelect = [
    {
      title: "All Test",
      Component: "",
      icon: "fa-solid fa-children",
    },
    {
      title: "Aptitude & Reasoning",
      Component: " ",
      icon: "fa-solid fa-puzzle-piece",
    },
    {
      title: "Coding Programming",
      Component: " ",
      icon: "fa-solid fa-code",
    },
    {
      title: "Technical Assessment",
      Component: " ",
      icon: "fa-brands fa-windows",
    },

    {
      title: "Foundation schools",
      Component: " ",
      icon: "fa-solid fa-children",
    },
    {
      title: "Domain Specific Roles",
      Component: " ",
      icon: "fa-solid fa-briefcase",
    },
  ];

  if (UserDetails.isOrganisation) {
    OptionSelect.push({
      title: "Your Tests",
      Component: " ",
      icon: "fa-brands fa-windows",
    });
  }

  const itemRefs = useRef({});



  function OptionClicked(e,key) {
    const text = e.target.textContent;

    Object.values(itemRefs.current).forEach((el) => {
      el?.classList.remove("tw-bg-green-100", "tw-text-white"); // Remove active class from all
    });
    
    const isActive = itemRefs.current[key];
    
    if (isActive) {
      isActive.classList.add("tw-bg-green-100", "tw-text-white"); // Add active class to the clicked item
    }


   

    setBedcrum(text)
    

    if (text.trim() === "Your Tests") {
      SetShowCard(test);
    } else {
      const filtertest = allTest.filter((ele) => {
        return ele.part.trim() === text.trim();
      });
      SetShowCard(filtertest);
    }
  }

  return (
    <div className=" container-fluid tw-bg-[#212A31]">
      <div className="row flex-xl-nowrap">
        {/* Sidebar Section */}
        <div className="col-12 col-md-2 tw-bg-[#F9FAFB] tw-shadow-lg tw-p-4">
  {/* 🔍 Search Bar */}
  <div className="tw-flex tw-items-center tw-w-full tw-mb-4">
    <input
      type="search"
      className="tw-w-full tw-px-4 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-outline-none focus:tw-border-green-500 focus:tw-shadow-md"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="🔍 Search..."
    />
  </div>

  {/* 🔹 Divider Line */}
  <div className="border tw-mt-2 tw-mb-2"></div>

  {/* 📌 Sidebar Options */}
  <div className="tw-space-y-2">
    {OptionSelect.map((item, index) => (
      <div
        key={index}
        ref={(el) => (itemRefs.current[index] = el)}
        className="tw-flex tw-items-center tw-space-x-3 tw-p-3 tw-rounded-lg tw-cursor-pointer tw-transition-all 
          hover:tw-bg-green-100 hover:tw-text-green-700"
        onClick={(e) => OptionClicked(e,index)}
      >
        <i className={`${item.icon} tw-text-lg tw-text-green-500`} />
        <span className="tw-font-medium tw-text-gray-700">{item.title}</span>
      </div>
    ))}
  </div>
</div>
        {/* Main Content Section */}
        <div className="col-12 col-md-10 tw-p-6">
          {/* Breadcrumb and Custom Test Button */}
          <div className="tw-flex md:tw-flex-row tw-flex-col tw-justify-between tw-items-center tw-px-4 tw-mb-5">
            <h3 className="tw-text-white tw-text-center">{bedcrum}</h3>
            {UserDetails.isOrganisation && <Link
              to="/customtest"
              className="tw-no-underline tw-px-6 tw-py-3 tw-text-lg tw-font-medium tw-bg-green-500 tw-text-white tw-rounded-lg tw-shadow-md hover:bg-green-600 hover:shadow-lg tw-transition-all tw-duration-200 tw-ease-in-out tw-transform hover:tw-translate-y-0.5 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400 focus:tw-ring-offset-2
"
            >
              Custom Test &nbsp; <i className="fa-solid fa-plus"></i>
            </Link>}
          </div>

          {/* Display Test Cards */}
          <div className=" tw-flex md:tw-justify-start tw-justify-center tw-flex-wrap">
            {showCard.length === 0 ? (
              allTest.length === 0 ? (
                <Shimmer />
              ) : (
                allTest.map((test) => (
                  <TestCard
                    key={test?._id}
                    id={test?._id}
                    name={test?.name}
                    desc={test?.desc}
                    icon={test?.icon}
                    click={() => {
                      linkClicked(test?._id);
                    }}
                    isOrg = {UserDetails?.isOrganisation}
                  />
                ))
              )
            ) : (
              showCard?.map((test) => (
                <TestCard
                  key={test?._id}
                  id={test?._id}
                  name={test?.name}
                  desc={test?.desc}
                  icon={test?.icon}
                  click={() => {
                    linkClicked(test?._id);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-white tw-rounded-lg tw-p-6 tw-w-[50%] tw-mx-4">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-4">
              Send Assessment Invitation
            </h3>
            <form onSubmit={sendEmail} className="space-y-4">
              <div>
                <label
                  htmlFor="candidateName"
                  className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                >
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="candidateName"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="candidateEmail"
                  className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                >
                  Candidate Email
                </label>
                <input
                  type="email"
                  id="candidateEmail"
                  name="candidateEmail"
                  value={formData.candidateEmail}
                  onChange={handleChange}
                  className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                  required
                />
              </div>

              {/* <div>
          <label htmlFor="assessmentType" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            Assessment Type
          </label>
          <select
            id="assessmentType"
            name="assessmentType"
            value={formData.assessmentType}
            onChange={handleChange}
            className="tw-w-full tw-p-2 tw-border tw-border-gray-300 rounded-md focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          >
            <option value="technical">Technical Assessment</option>
            <option value="coding">Coding Challenge</option>
            <option value="behavioral">Behavioral Assessment</option>
            <option value="aptitude">Aptitude Test</option>
          </select>
        </div> */}

              <div>
                <label
                  htmlFor="message"
                  className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                >
                  Custom Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                  placeholder="Add a personal message to the invitation email..."
                />
              </div>

              <div className=" tw-flex tw-justify-between tw-flex-row-reverse tw-mb-5">
                <div>
                  {" "}
                  <label
                    htmlFor="Expired"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                  >
                    Link Expired Date
                  </label>
                  <input
                    id="Expired"
                    required
                    type="text"
                    name="Expired"
                    value={formData.Expired}
                    onChange={handleChange}
                    rows="4"
                    className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <label
                    htmlFor="MobileNo"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                  >
                    Student Mobile Number
                  </label>
                  <input
                    id="MobileNo"
                    required
                    type="text"
                    name="MobileNo"
                    value={formData.MobileNo}
                    onChange={handleChange}
                    rows="4"
                    className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
                    placeholder="12345678910"
                  />
                </div>
              </div>

              <div className="tw-flex tw-justify-end tw-space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="tw-flex items-center tw-justify-center tw-gap-2 tw-bg-red-600 tw-text-white tw-py-2 tw-px-4 tw-rounded-md hover:tw-bg-red-700 tw-transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" tw-flex items-center tw-justify-center tw-gap-2 tw-bg-blue-600 tw-text-white tw-py-2 tw-px-4 tw-rounded-md hover:tw-bg-blue-700 tw-transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestLib;

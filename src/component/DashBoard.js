import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/UserSlice";
import { io } from "socket.io-client";
import StudentInfoCard from "./StudentInfoCard";
import TestDetailsCard from "./TestDetailsCard";

import PerformanceAnalysis from "./PerformanceAnalysis";


const Dashboard = () => {
  const dispatch = useDispatch();
  const UserDetails = useSelector((Store) => Store.User.item);

  const [isOrg, setIsOrg] = useState(UserDetails[0]?.isOrganisation);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTest, setSelectedTest] = useState(isOrg ? UserDetails[0]?.testsCreated : UserDetails[0]?.recentAssessments[0]?._id  );
  const [dashboardData, setDashboardData] = useState(isOrg ? UserDetails[0]?.testsCreated : UserDetails[0]?.recentAssessments);
  const [error, setError] = useState(null);
  const [dashboard, setDashboard] = useState(true);
  const [std,setStd] = useState(false)
  const [assessment, setAssessment] = useState(false);
  const [result, setResult] = useState(false);
  const[performanceData,setPerformanceData] = useState([]);
 

  useEffect(() => {

    const socket = io("https://testify-backend-bk4i.onrender.com", {
      withCredentials: true,
       
    });

    socket.on("connect", () => {
      console.log("Frontend socket connected with ID:", socket.id);
    });
    
    if (UserDetails[0]?._id) {
      console.log(`Listening to update`);
      socket.on(`update`, (updatedData) => {
        console.log("Recruiter data updated:", updatedData);
        dispatch(updateUser(updatedData)); // Update Redux store with the new data
      });
    }
  
    return () => {
      if (UserDetails[0]?._id) {
        console.log(`Removing listener update`);
        socket.off(`update`);
      }
    };

    
  }, [dispatch]);


  async function getPerformance(){
    try {
      const Response = await fetch(`https://testify-backend-bk4i.onrender.com/api/getanalysis/${selectedTest}`,{
        method:"GET",
        credentials :"include",
        headers :{
          "Content-Type" : "application/json"
        }
      })

      const data = await Response.json();
      setPerformanceData(data?.data);


    } catch (error) {
      console.log("error getting performance :",  error);
      
      
    }

  }
  const TabButton = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`tw-flex tw-items-center tw-p-3 tw-rounded-lg tw-transition-all tw-w-full ${
        activeTab === id
          ? "tw-bg-blue-100 tw-text-blue-600"
          : "tw-hover:bg-gray-100"
      }`}
    >
      <i className={`${icon} tw-w-5 tw-h-5 tw-mr-2`}></i>
      <span className="tw-text-sm tw-font-medium">{label}</span>
    </button>
  );
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = [
    {
      label: isOrg ?  "Total Assessments" : "Test Compleated",
      value: isOrg ? UserDetails[0]?.testsCreated.length : UserDetails[0]?.testsCompleted
    },
    {
      label: isOrg ? "Invitations" : "Response Time (sec)" ,
      value:  isOrg ? UserDetails[0]?.sharedTests.length : UserDetails[0]?.responseTime 
    },

    {
      label:"Completion Rate",
      value:"90%"
    },
    {
      label:isOrg ?  "Active Assessments" : "Average Score",
      value: isOrg ? "24" : parseInt(UserDetails[0]?.averageScore)
    }
  ];

  const info = [
    {
      label: "Total User",
      value: UserDetails[0]?.FullName,
      icon: <span>👥</span>,
    },
    {
      label: "Name",
      value: UserDetails[0]?.FullName,
      icon: <span>👤</span>,
    },
    {
      label: "Email",
      value: UserDetails[0]?.Email,
      icon: <span>📩</span>,
    },
    {
      label: "Mobile",
      value: UserDetails[0]?.MobileNo,
      icon: <span>📱</span>,
    },
    {
      label: "Satisfaction Rate",
      value: UserDetails[0]?.MobileNo,
      icon: <span>🌟</span>,
    }
  ]

  if (UserDetails[0]?.OrganisationName) {
    info.push({
      label: "Organisation",
      value: UserDetails[0]?.OrganisationName,
      icon: <span>🏭</span>,
    })
  }

  const formatEmail = (email) => {
    if (email.length > 25) {
      return email.substring(0, 25) + '...';
    }
    return email;
  };

  const sideBarContent = [
    { icon: <span>📊</span>, label: "Overview" },
              
              { icon: <span>📄</span>, label: "Assessments" },
              { icon: <span>🏆</span>, label: "Results" },
  ]

  if (UserDetails[0]?.OrganisationName) {
    sideBarContent.push({ icon:<span>👨🏻‍🎓</span>, label:"Candidates" })
  }

  return (
    <>
      <div className="tw-min-h-screen tw-bg-gray-50 tw-flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "tw-w-64" : "tw-w-20"
          } tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300`}
        >
          <div className="tw-p-4 tw-flex tw-items-center tw-justify-between">
            <h2
              className={`tw-font-bold tw-text-xl ${
                !isSidebarOpen && "tw-hidden"
              }`}
            >
              AssessHub AI
            </h2>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="tw-p-2 hover:tw-bg-gray-100 tw-rounded-lg"
            >
              {isSidebarOpen ? (
                <span>X</span>
              ) : (
                <i class="fa-solid fa-bars tw-text-2xl"></i>
              )}
            </button>
          </div>

          <nav className="tw-mt-8">
  
            {sideBarContent.map((item, index) => (
              <p
                key={index}
                onClick={(e) => {
                  if (e.target.textContent === "Overview") {
                    setAssessment(false);
                    setDashboard(true);
                    setResult(false);
                    setStd(false)
                  }
                  if (e.target.textContent === "Candidates") {
                    setStd(true)
                    setAssessment(false);
                    setDashboard(false);
                    setResult(false);
                  }
                  if (e.target.textContent === "Assessments") {
                    setAssessment(true);
                    setDashboard(false);
                    setResult(false);
                    setStd(false)
                  }
                  if (e.target.textContent === "Results") {
                    setAssessment(false);
                    setDashboard(false);
                    setResult(true);
                    setStd(false)
                  }
                }}
                className={`tw-w-full tw-flex ${
                  !isSidebarOpen && "tw-justify-center"
                } tw-items-center tw-px-4 tw-py-3 tw-text-gray-600 hover:tw-bg-gray-100 hover:tw-text-gray-900 tw-mb-3`}
              >
                {item.icon}
                <span
                  className={`tw-ml-3 ${
                    !isSidebarOpen && "tw-hidden"
                  } tw-cursor-pointer`}>{item.label}
                </span>
              </p>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="tw-flex-1 tw-p-8">
          {/* Header */}
          <header className="tw-flex tw-justify-between tw-items-center tw-mb-8">
            <div>
              <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">
                Welcome back,{" "}
                {isOrg ? UserDetails[0]?.FullName : UserDetails[0]?.FullName}!
              </h1>
              <p className="tw-text-gray-600">
                {isOrg ? "Organization Dashboard" : "Student Dashboard"}
              </p>
            </div>
            <div className="tw-flex tw-items-center tw-gap-4">
              <div className="tw-flex tw-items-center tw-gap-2">
                <div className="tw-h-12 tw-w-12 tw-rounded-full tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-flex tw-items-center tw-justify-center">
                  <i className="fas fa-user tw-text-white tw-text-lg"></i>
                </div>
                <div
                  className={`${
                    !isSidebarOpen && "tw-hidden"
                  } tw-flex tw-flex-col tw-justify-center`}
                >
                  <span className="tw-font-medium ">
                    {isOrg ? "Admin User" : UserDetails[0]?.FullName}
                  </span>
                  <span className="tw-text-sm tw-text-gray-600">
                    {isOrg ? "Organization" : "Student"}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* AI Features Highlight */}

          {dashboard && (
            <>
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-mb-8">
                <div className="tw-bg-gradient-to-br tw-from-indigo-500 tw-to-blue-600 tw-p-6 tw-rounded-xl tw-shadow-sm tw-border tw-transform tw-transition-all tw-duration-300 tw-border-indigo-100 hover:tw-scale-105 hover:tw-shadow-xl">
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
                    <div className="tw-p-2 tw-bg-indigo-100 tw-rounded-full">
                      <span>⚡</span>
                    </div>
                    <h3 className="tw-font-semibold tw-text-white">Instant Results</h3>
                  </div>
                  <p className="tw-text-white">
                    Get immediate feedback and scores upon completion
                  </p>
                </div>
                

                <div className="tw-bg-gradient-to-br tw-from-purple-500 tw-to-pink-600 tw-p-6 tw-rounded-xl tw-shadow-sm tw-border tw-transform tw-transition-all tw-duration-300 tw-border-purple-100 hover:tw-scale-105 hover:tw-shadow-xl">
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
                    <div className="tw-p-2 tw-bg-indigo-100 tw-rounded-full">
                      <span>🧠</span>
                    </div>
                    <h3 className="tw-font-semibold tw-text-white">AI Scoring</h3>
                  </div>
                  <p className="tw-text-white">
                    Advanced AI evaluation of technical skills
                  </p>
                </div>

                <div className="tw-bg-gradient-to-br tw-from-green-500 tw-to-teal-600 tw-p-6 tw-rounded-xl tw-shadow-sm tw-border tw-transform tw-transition-all tw-duration-300 tw-border-blue-100 hover:tw-scale-105 hover:tw-shadow-xl">
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
                    <div className="tw-p-2 tw-bg-indigo-100 tw-rounded-full">
                      <span>📈</span>
                    </div>
                    <h3 className="tw-font-semibold tw-text-white">Performance Metrics</h3>
                  </div>
                  <p className="tw-text-white">
                    Detailed analytics and skill insights
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-8">
                {info.map((stat, index) => (
                  <div
                    key={index}
                    className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-sm hover:tw-shadow-lg tw-transition-shadow tw-duration-300"
                  >
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                      <div className="tw-p-2 tw-bg-indigo-100 tw-rounded-lg">
                        {stat.icon}
                      </div>
                      <span className="tw-text-gray-400">➤</span>
                    </div>
                    <p className="tw-text-gray-600">{stat.label}</p>
                    <p className="tw-text-lg tw-font-semibold  tw-mt-1">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}


          {assessment && (
            <>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4 tw-mb-8">
            {metrics.map((metric)=>{
              return (
                <div className="tw-bg-white tw-rounded-lg tw-shadow p-4">
    <h3 className="tw-text-lg tw-font-semibold tw-text-gray-700">{metric.label}</h3>
    <p className="tw-text-3xl tw-font-bold tw-text-indigo-600">{metric.value}</p>
  </div>
              )
            })}
            </div>

            <h2 className="tw-mb-6 tw-text-2xl tw-font-extrabold tw-text-indigo-600 tw-tracking-wide tw-border-b-2 tw-border-indigo-400 tw-pb-2">
  {isOrg ? "Assessment Created" : "Recent Assessment"}
</h2>
            <div className=" tw-flex tw-flex-col tw-gap-5 ">
            <TestDetailsCard test = {dashboardData} isOrg = {isOrg} CompleatedOn = {UserDetails[0]?.updatedAt} setAssessment = {setAssessment} setResult = {setResult} setSelectedTest={setSelectedTest} getPerformance={getPerformance} />
            </div>
          
          
            </>
             

            
          )}

          {std && (
            <div className=" tw-flex-col tw-gap-5">
  {UserDetails[0]?.sharedTests.map((item, index) => (
  <div className=" tw-flex-col tw-gap-5 tw-p-2">
      {item.sharedWith.map((ir) => (
        <>
  <StudentInfoCard ir={ir} key={ir._id} />
        </>
       
      ))}
   </div>
  ))}
</div>
          )}

          {result  && <PerformanceAnalysis data = {performanceData} />
          
}


        </main>
      </div>
    </>
  );
};




export default Dashboard;

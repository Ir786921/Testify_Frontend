import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts"

const MetricCard = ({ title, value, icon, color, progress }) => (
    <div className="tw-overflow-hidden tw-transition-all tw-duration-300 hover:tw-shadow-lg tw-p-4 tw-rounded-lg border border-secondary">
       <div className="tw-flex tw-items-center tw-justify-between mb-4">
        <h3 className="tw-text-lg tw-font-medium tw-text-gray-700 ">{title}</h3>
        <div className="tw-p-2 tw-bg-[#E0E7FF] tw-rounded-full tw-text-2xl tw-flex tw-justify-center tw-items-center">{icon}</div>
      </div>
      <p className="tw-text-3xl tw-font-bold tw-text-gray-900  tw-mb-2">{value}</p>
      {progress !== undefined && (
        <div className="space-y-1">
          <progress value={progress} className="h-2" />
          <p className="tw-text-sm tw-text-gray-500 ">{progress}% Complete</p>
        </div>)}
    </div>
  )

const PerformanceAnalysis = ({data}) => {
    const performanceData = [
        { name: 'Correct', value: data[0]?.correctAnswers },
        { name: 'Wrong', value: data[0]?.wrongAnswers }
      ];
  return (
    <div className="tw-min-h-screen tw-w-full tw-bg-gradient-to-br tw-from-gray-50 tw-to-gray-100 tw-p-4">
             <div className="tw-max-w-7xl tw-mx-auto tw-space-y-8">
             <header className="tw-bg-white tw-rounded-xl tw-p-8 tw-shadow-md border border-secondary">
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-center tw-gap-4">
            <div>
              <h1 className="tw-text-4xl tw-font-bold tw-mb-2"> {data[0]?.title} Performance Report</h1>
              <div className="tw-flex tw-items-center tw-gap-2">
                <i className="fas fa-award tw-h-6 tw-w-6 tw-text-blue-600"></i>
                <p className="tw-text-xl">{data[0]?.userName}</p>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <i className="fa-solid fa-envelope tw-h-6 tw-w-6 tw-text-black"></i>
                <p className="tw-text-sm tw-opacity-75 tw-mt-1">{data[0]?.userEmail}</p>
              </div>
        
            </div>
            <div className="tw-text-right">
              <p className="tw-text-sm tw-opacity-75">Test ID:{data[0]?.testId} </p>
              <p className="tw-text-sm tw-opacity-75">Date: </p>
            </div>
          </div>
        </header>
             </div>

             <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-mt-5">
          <MetricCard
            title="Accuracy"
            value={data[0]?.accuracy}
            icon={"🎯"}
            color="tw-from-blue-500 tw-to-blue-600"
            progress={data[0]?.accuracy}
          />
          <MetricCard
            title="Avg Response Time"
            value={data[0]?.averageResponseTime}
            icon={"🕑"}
            color="tw-from-green-500 tw-to-green-600"
          />
          <MetricCard
            title="Total Questions"
            value={data[0]?.totalQuestions.toString()}
            icon={"🧠"}
            color="tw-from-purple-500 tw-to-purple-600"
          />
          <MetricCard
            title="Performance Score"
            value={`${Math.round((data[0]?.correctAnswers / data[0]?.totalQuestions) * 100)}/100`}
            icon={"📉"}
            color="tw-from-red-500 tw-to-red-600"
          />
        </div>

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 tw-mt-5 tw-shadow-md tw-rounded-lg">
          <div className="tw-overflow-hidden tw-shadow-xl tw-col-span-1 lg:tw-col-span-2 tw-rounded-lg">
            <div className="tw-bg-[#17202E] tw-p-6">
              <h2 className="tw-text-white tw-text-2xl tw-flex tw-items-center tw-gap-2">
                <i className="fas fa-chart-bar tw-h-6 tw-w-6"></i>
                Performance Analysis
              </h2>
            </div>
            <div className="tw-p-6">
              <div className="tw-h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="url(#colorGradient)" />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
              </div>
              <div className="tw-mt-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div className="tw-bg-green-100 tw-p-4 tw-rounded-lg">
                  <h3 className="tw-text-lg tw-font-semibold tw-text-green-800  tw-mb-2">Correct Answers</h3>
                  <p className="tw-text-3xl tw-font-bold tw-text-green-600">{data[0]?.correctAnswers}</p>
                  <p className="tw-text-sm tw-text-green-700  tw-mt-1">
                     out of  {data[0]?.totalQuestions} questions
                  </p>
                </div>
                <div className="tw-bg-red-100 tw-p-4 tw-rounded-lg">
                  <h3 className="tw-text-lg tw-font-semibold tw-text-red-800  tw-mb-2">Wrong Answers</h3>
                  <p className="tw-text-3xl tw-font-bold tw-text-red-600 ">{data[0]?.wrongAnswers}</p>
                  <p className="tw-text-sm tw-text-red-700 tw-mt-1">  out of  questions {data[0]?.totalQuestions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 tw-mt-5">
  {/* Strengths Card */}
  <div className="tw-overflow-hidden tw-shadow-lg tw-rounded-xl tw-bg-white dark:tw-bg-gray-900 tw-border tw-border-gray-300 dark:tw-border-gray-700">
    <div className="tw-bg-gradient-to-r tw-from-[#E0F2FE] tw-to-[#F0FDFA] dark:tw-from-gray-800 dark:tw-to-gray-900 tw-p-6 tw-rounded-t-xl">
      <h2 className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
        Strengths &nbsp;    <div className=' tw-p-2 tw-bg-[#E0E7FF] tw-rounded-full tw-text-2xl tw-flex tw-justify-center tw-items-center' ><i class="fa-solid fa-hand-fist tw-text-purple-600 tw-text-xl"></i></div> 
      </h2>
    </div>
    <div className="tw-p-6">
    <ul className="tw-space-y-3">
          {data[0]?.strengths.map((area, index) => (
            <li key={index} className="tw-flex tw-items-center tw-gap-3 tw-p-3 tw-bg-[#F3E8FF] dark:tw-bg-gray-800 tw-rounded-lg tw-border tw-border-gray-200 dark:tw-border-gray-600 tw-mr-8">
            <span className="tw-bg-[#E9D5FF] dark:tw-bg-purple-800 tw-text-purple-800 dark:tw-text-purple-200 tw-px-3 tw-py-1 tw-rounded-lg tw-text-sm tw-font-semibold">
              {index + 1}
            </span>
            <span className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-sm tw-font-medium">{area}</span>
          </li>
          ))}
        </ul>
    </div>
  </div>

  {/* Weaknesses Card */}
  <div className="tw-overflow-hidden tw-shadow-lg tw-rounded-xl tw-bg-white dark:tw-bg-gray-900 tw-border tw-border-gray-300 dark:tw-border-gray-700">
    <div className="tw-bg-gradient-to-r tw-from-[#FEF3C7] tw-to-[#FEF9E7] dark:tw-from-gray-800 dark:tw-to-gray-900 tw-p-6 tw-rounded-t-xl">
      <h2 className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
        Weaknesses  &nbsp; <span className=' tw-text-xl'> ⚠️</span>
      </h2> 
    </div>
    <div className="tw-p-6">
    <ul className="tw-space-y-3">
          {data[0]?.weaknesses.map((area, index) => (
            <li key={index} className="tw-flex tw-items-center tw-gap-3 tw-p-3 tw-bg-[#F3E8FF] dark:tw-bg-gray-800 tw-rounded-lg tw-border tw-border-gray-200 dark:tw-border-gray-600 tw-mr-8">
            <span className="tw-bg-[#E9D5FF] dark:tw-bg-purple-800 tw-text-purple-800 dark:tw-text-purple-200 tw-px-3 tw-py-1 tw-rounded-lg tw-text-sm tw-font-semibold">
              {index + 1}
            </span>
            <span className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-sm tw-font-medium">{area}</span>
          </li>
          ))}
        </ul>
    </div>
  </div>
</div>



<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 tw-mt-5">
  {/* Areas to Improve Card */}
  <div className="tw-overflow-hidden tw-shadow-lg tw-rounded-xl tw-bg-white dark:tw-bg-gray-900 tw-border tw-border-gray-300 dark:tw-border-gray-700">
    <div className="tw-bg-gradient-to-r tw-from-[#FCE7F3] tw-to-[#E0E7FF] dark:tw-from-gray-800 dark:tw-to-gray-900 tw-p-6 tw-rounded-t-xl">
      <h2 className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
        Areas to Improve &nbsp; <i class="fa-solid fa-arrow-up-from-bracket tw-text-purple-700 tw-text-xl"></i>
      </h2>
    </div>
    <div className="tw-p-6">
      <ul className="tw-space-y-3">
        {data[0]?.areasToImprove.map((area, index) => (
          <li key={index} className="tw-flex tw-items-center tw-gap-3 tw-p-3 tw-bg-[#F3E8FF] dark:tw-bg-gray-800 tw-rounded-lg tw-border tw-border-gray-200 dark:tw-border-gray-600 tw-mr-8">
            <span className="tw-bg-[#E9D5FF] dark:tw-bg-purple-800 tw-text-purple-800 dark:tw-text-purple-200 tw-px-3 tw-py-1 tw-rounded-lg tw-text-sm tw-font-semibold">
              {index + 1}
            </span>
            <span className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-sm tw-font-medium">{area}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Recommendations Card */}
  <div className="tw-overflow-hidden tw-shadow-lg tw-rounded-xl tw-bg-white dark:tw-bg-gray-900 tw-border tw-border-gray-300 dark:tw-border-gray-700">
    <div className="tw-bg-gradient-to-r tw-from-[#DBEAFE] tw-to-[#EFF6FF] dark:tw-from-gray-800 dark:tw-to-gray-900 tw-p-6 tw-rounded-t-xl">
      <h2 className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
        Feedback &nbsp; <i class="fa-solid fa-comments tw-text-blue-500 tw-text-xl"></i>
      </h2>
    </div>
    <div className="tw-p-6">
      <ul className="tw-space-y-3">
        {data[0]?.feedback.map((recommendation, index) => (
          <li key={index} className="tw-flex tw-items-start tw-gap-3 tw-p-3 tw-bg-[#E0F2FE] dark:tw-bg-gray-800 tw-rounded-lg tw-border tw-border-gray-200 dark:tw-border-gray-600 tw-mr-8">
            <span className="tw-mt-1 tw-bg-[#60A5FA] dark:tw-bg-blue-800 tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-text-sm tw-font-semibold">
              {index + 1}
            </span>
            <p className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-sm tw-font-medium">{recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>


<div className="tw-overflow-hidden tw-shadow-lg tw-rounded-xl tw-bg-white dark:tw-bg-gray-900 tw-border tw-border-gray-300 dark:tw-border-gray-700 tw-mt-5">
  {/* Header with Soft Gradient */}
  <div className="tw-bg-gradient-to-r tw-from-[#FEF9C3] tw-to-[#FFEDD5] dark:tw-from-gray-800 dark:tw-to-gray-900 tw-p-6 tw-rounded-t-xl">
    <h2 className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
    Recommendations &nbsp; <i class="fa-solid fa-thumbs-up tw-text-[#FFEDD5] tw-text-xl"></i>
    </h2>
  </div>

  {/* Feedback List */}
  <div className="tw-p-6">
    <ul className="tw-space-y-3">
      {data[0]?.recommendations.map((item, index) => (
        <li key={index} className="tw-flex tw-items-start tw-gap-3 tw-p-3 tw-bg-[#FEF3C7] dark:tw-bg-gray-800 tw-rounded-lg tw-border tw-border-gray-200 dark:tw-border-gray-600 tw-mr-8">
          <span className="tw-mt-1 tw-bg-[#FACC15] dark:tw-bg-yellow-700 tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-text-sm tw-font-semibold">
            {index + 1}
          </span>
          <p className="tw-text-gray-900 dark:tw-text-gray-100 tw-text-sm tw-font-medium">{item}</p>
        </li>
      ))}
    </ul>
  </div>
</div>

 
            </div>
  )
}

export default PerformanceAnalysis
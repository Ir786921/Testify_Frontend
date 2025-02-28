import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'


const ThankYouAssessment = () => {

  const id = useSelector(store => store.library.testID)
  useEffect(() => {
   
  
  
  }, [])
  
  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-50">
      <div className="tw-max-w-md tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-8 tw-text-center tw-space-y-6">
        <div className="tw-flex tw-justify-center">
          {/* <CheckCircle className="tw-w-16 tw-h-16 tw-text-green-500" /> */}
        </div>
        
        <h1 className="tw-text-3xl tw-font-bold tw-text-gray-900">
          Thank You!
        </h1>
        
        <p className="tw-text-lg tw-text-gray-600">
          Your assessment has been successfully submitted. We appreciate your time and effort in completing this evaluation.
        </p>
        
        <div className="tw-bg-green-50 tw-p-4 tw-rounded-md">
          <p className="tw-text-green-700 tw-text-sm">
            You will receive your results via email within the next 24 hours.
          </p>
        </div>
        
        <div className="tw-pt-4">
          <Link to={`/dashboard/${id}`}
            className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-md tw-font-medium 
                     tw-transition-colors tw-duration-200 hover:tw-bg-blue-700 
                     focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
           
          >
            Return to Dashboard
          </Link>
        </div>
        
        <p className="tw-text-sm tw-text-gray-500">
          If you have any questions, please contact our support team.
          <br />
          <br />
          You can Close the Tab now..
        </p>
      </div>
    </div>
  );
};

export default ThankYouAssessment;
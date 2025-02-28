import React from 'react'

const StudentInfoCard = ({ ir,key }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case "active":
          return "tw-bg-green-100 tw-text-green-800"
        case "inactive":
          return "tw-bg-red-100 tw-text-red-800"
        default:
          return "tw-bg-gray-100 tw-text-gray-800"
      }
    }
  
    const getAttemptStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case "completed":
          return "tw-bg-blue-100 tw-text-blue-800"
        case "not completed":
          return "tw-bg-yellow-100 tw-text-yellow-800"
        default:
          return "tw-bg-gray-100 tw-text-gray-800"
      }
    }
  
    return (
        <div key={key} className="tw-w-full tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-border tw-border-indigo-200 hover:tw-shadow-xl tw-transition-shadow tw-duration-300">
        <div className="tw-p-4 sm:tw-p-6">
          <div className="tw-flex tw-flex-col tw-space-y-4">
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center">
              <h3 className="tw-text-xl tw-font-semibold tw-text-indigo-800 tw-mb-2 sm:tw-mb-0">
                Student Information
              </h3>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                <span className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium ${getStatusColor(ir.status)}`}>
                  {ir.status}
                </span>
                <span className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium ${getAttemptStatusColor(ir.attemptStatus)}`}>
                  {ir.attemptStatus}
                </span>
              </div>
            </div>
      
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
              <InfoItem icon="fa-user" label="Student Name" value={ir.studentName} />
              <InfoItem icon="fa-envelope" label="Email" value={ir.studentEmail} />
              <InfoItem icon="fa-phone" label="Mobile No" value={ir.MobileNo} />
              <InfoItem icon="fa-calendar-alt" label="Test Expiry" value={ir.testExpiry} />
              <InfoItem icon="fa-share-alt" label="Share on" value={ir.sharedOn} />
            </div>
          </div>
        </div>
      </div>
      
    )
  }
  
  const InfoItem = ({ icon, label, value }) => (
    <div className="tw-flex tw-items-start tw-space-x-3 tw-bg-white p-3 tw-rounded-lg tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-duration-200">
      <i className={`fas ${icon} tw-text-indigo-500 tw-w-5 tw-h-5 tw-mt-1`}></i>
      <div className="tw-min-w-0 tw-flex-1">
        <p className="tw-text-xs tw-text-gray-500">{label}</p>
        <p className="tw-text-sm tw-text-gray-700 tw-font-medium tw-truncate">{value}</p>
      </div>
    </div>
  )
  
  export default StudentInfoCard
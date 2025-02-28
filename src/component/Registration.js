import { useState } from "react"
import { useSelector } from "react-redux"
// import Image from "../"
import RegImg from "../assests/Register.png"

const Registration = () => {


  const UserDetails = useSelector((store) => store.User)

  return (
    <div className="tw-h-[500px] tw-flex md:tw-flex-col tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-p-6 tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-100 tw-rounded-lg">
     <p className="tw-text-lg tw-font-medium tw-text-gray-700 tw-mb-4">Please verify your details before proceeding</p>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-100 tw-to-purple-200 tw-p-6">
      <div className="tw-w-full tw-max-w-lg tw-p-8 tw-shadow-lg tw-rounded-3xl tw-bg-white">
        <h2 className="tw-text-center tw-text-3xl tw-font-bold tw-text-gray-800 tw-mb-6">Candidate Verification</h2>
        <div className="tw-space-y-6">
          {/* Candidate Details */}
          <div>
            <label className="tw-text-sm tw-font-semibold tw-text-gray-700">Full Name</label>
            <input type="text" value="John Doe" disabled className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2" />
          </div>
          <div>
            <label className="tw-text-sm tw-font-semibold tw-text-gray-700">Email</label>
            <input type="email" value="johndoe@example.com" disabled className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2" />
          </div>
          <div>
            <label className="tw-text-sm tw-font-semibold tw-text-gray-700">Mobile Number</label>
            <input type="text" value="+91 9876543210" disabled className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2" />
          </div>
          <div>
            <label className="tw-text-sm tw-font-semibold tw-text-gray-700">Test Expiry Date</label>
            <input type="text" value="2025-02-15" disabled className="tw-bg-gray-100 tw-rounded-lg tw-shadow-sm tw-w-full tw-p-2" />
          </div>
         
        </div>
      </div>
      <p className="tw-text-sm tw-text-gray-600 tw-mt-4">Ensure your details are correct before starting the assessment</p>
    </div>

      
    </div>
  )
}

const InputField = ({ label, type, placeholder, value, onChange, required }) => (
  <div>
    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
      {label} {required && <span className="tw-text-red-500">*</span>}
    </label>
    <input
      type={type}
      className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-border-indigo-500 tw-transition tw-duration-150 tw-ease-in-out"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
)

export default Registration
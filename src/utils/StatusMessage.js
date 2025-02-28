import React from "react";


const StatusMessage = ({ isBlurry, faceStatus }) => {
  let message = "";
  let bgColor = "";
  let borderColor = "";
  let textColor = "";
  let iconClass = "";

  if (!faceStatus) {
    // Face not in frame
    message = "Face Not in Frame! Please position yourself properly.";
    bgColor = "tw-bg-rose-50";
    borderColor = "tw-border-rose-500";
    textColor = "tw-text-rose-700";
    iconClass = "fas fa-user-slash";
  } else if (!isBlurry) {
    // Image is blurry
    message = "Image is Blurry! Please try again.";
    bgColor = "tw-bg-amber-50";
    borderColor = "tw-border-amber-500";
    textColor = "tw-text-amber-700";
    iconClass = "fas fa-exclamation-triangle";
  } else {
    // Successful capture
    message = "Image Captured Successfully! Your face is clearly visible.";
    bgColor = "tw-bg-emerald-50";
    borderColor = "tw-border-emerald-500";
    textColor = "tw-text-emerald-700";
    iconClass = "fas fa-check-circle";
  }

  return (
    <div className={`tw-flex tw-items-center tw-justify-center tw-max-w-lg tw-px-5 tw-py-4 tw-rounded-lg tw-shadow-sm ${bgColor} tw-border-l-4 ${borderColor} tw-mb-5 tw-mt-5`}>
      <i className={`${iconClass} ${textColor} tw-text-lg tw-mr-3 tw-flex-shrink-0`}></i>
      <span className={`${textColor} tw-font-medium`}>{message}</span>
    </div>
  );
};

export default StatusMessage;

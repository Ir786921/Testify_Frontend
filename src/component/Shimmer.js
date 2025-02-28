import React from "react";

const Shimmer = () => {
    let num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return (

    <div>
        {num.map((ele)=>{
            return ( 
                <div className="tw-animate-pulse tw-p-3 tw-group tw-m-4 tw-w-[245px] tw-h-[333px] border border-success tw-inline-block tw-rounded-lg tw-bg-black">
      {/* Top section (icon + invite button) */}
      <div className="tw-flex tw-justify-between">
        {/* Large Icon Placeholder */}
        <div className="tw-flex tw-justify-center tw-items-center tw-rounded-full tw-border tw-border-success tw-w-16 tw-h-16 tw-bg-green-600"></div>

        {/* Small Invite Button Placeholder */}
        <div className="tw-flex tw-justify-center tw-items-center tw-rounded-full tw-border tw-border-success tw-w-8 tw-h-8 tw-bg-green-600 tw-p-1"></div>
      </div>

      <br />

      {/* Title Placeholder */}
      <div className="tw-h-4 tw-bg-white tw-rounded tw-w-3/4 tw-mb-2"></div>

      {/* Description Placeholder */}
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%]"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      <div className="tw-h-3 tw-bg-gray-600 tw-rounded tw-w-[95%] tw-mt-1"></div>
      

      {/* Button Placeholder */}
      <div className="tw-mt-4 tw-h-10 tw-w-32 tw-bg-green-600 tw-rounded-md tw-mx-auto"></div>
    </div>
            )
        })}
    </div>

   
    // <div className="tw-animate-pulse tw-bg-white tw-rounded-2xl tw-shadow-md tw-p-4 tw-flex tw-items-center tw-gap-4 tw-w-full tw-max-w-md">
    //   {/* Icon Placeholder */}
    //   <div className="tw-w-12 tw-h-12 tw-bg-gray-300 tw-rounded-full"></div>

    //   {/* Text Placeholder */}
    //   <div className="tw-flex-1 tw-space-y-2">
    //     <div className="tw-h-4 tw-bg-gray-300 tw-rounded tw-w-3/4"></div>
    //     <div className="tw-h-3 tw-bg-gray-300 tw-rounded tw-w-1/2"></div>
    //   </div>
    // </div>
  );
};

export default Shimmer

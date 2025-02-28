import React from 'react'

const SegmentBar = ({ progress }) => {
    const totalSegments = 20;
    const filledSegments = Math.round((progress / 100) * totalSegments);
  
    return (
      <div className="tw-flex tw-gap-1 tw-p-2 tw-rounded-lg tw-bg-gray-200 tw-w-fit tw-mx-auto">
        {[...Array(totalSegments)].map((_, index) => (
          <div
            key={index}
            className={`tw-w-3 tw-h-8 tw-rounded-md tw-transition-colors ${
              index < filledSegments ? 'tw-bg-pink-500' : 'tw-bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    );
}

export default SegmentBar;
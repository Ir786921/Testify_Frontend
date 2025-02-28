import React, { useState, useEffect } from 'react';

const Spinner = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-screen tw-bg-gradient-to-br tw-from-emerald-50 tw-to-teal-50">
      {/* Main container */}
      <div className="tw-relative tw-w-48 tw-h-48">
        {/* Rotating outer ring */}
        <div className="tw-absolute tw-inset-0 tw-animate-spin" style={{ animationDuration: '3s' }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="tw-absolute tw-w-3 tw-h-3 tw-bg-emerald-400 tw-rounded-full tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-20px)`,
                opacity: 0.2 + (i % 3) * 0.3,
              }}
            />
          ))}
        </div>

        {/* Middle rotating hexagon */}
        <div className="tw-absolute tw-inset-0 tw-animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="tw-absolute tw-w-4 tw-h-16 tw-bg-gradient-to-b tw-from-emerald-400 tw-to-teal-500 tw-rounded-full tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 60}deg) translateY(-8px)`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spinner;

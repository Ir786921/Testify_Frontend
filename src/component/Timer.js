import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes = 0, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(() => initialMinutes * 60); // Convert minutes to seconds

  useEffect(() => {
    setTimeLeft(initialMinutes * 60); // Reset timer when `initialMinutes` changes
  }, [initialMinutes]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete(); // Call when countdown ends
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [timeLeft, onComplete]);

  // Convert seconds to HH::MM::SS format
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00::00::00"; // Prevent NaN issues

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}::${String(minutes).padStart(2, "0")}::${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="tw-text-xl tw-font-semibold tw-text-green-600">
      ⏳ {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;

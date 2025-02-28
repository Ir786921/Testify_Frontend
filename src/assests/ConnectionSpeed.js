import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { speed } from "../Redux/WebCamPermissionSlice";

const TestNetworkSpeed = () => {
  const [speed1, setSpeed1] = useState(null);
  const dispatch = useDispatch();
  const Network = useSelector((Store) => Store.networkSpeed.value);

  const checkSpeed = async () => {
    try {
      const imageUrl =
      "https://media.licdn.com/dms/image/v2/D5635AQFtFV7Ikplzig/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1709388531186?e=1739361600&v=beta&t=AUNzjcOH8seF-vhOujAAdDwteVxqlh9b2k2ipF7mlY0"; // Small image (~500 KB)
    const fileSize = 500000; 

    const startTime = Date.now();
    await fetch(imageUrl, { cache: "no-cache" }); 
    const endTime = Date.now();

    const duration = (endTime - startTime) / 1000; 
    const speedMbps = (fileSize * 8) / (duration * 1024 * 1024); 
    setSpeed1(speedMbps.toFixed(2));
    dispatch(speed(speedMbps.toFixed(2)))
      
    } catch (error) {
       <h1>{error}</h1>
    }
  };


  useEffect(() => {
    checkSpeed();
    
  }, []); 

  return (
     <span>{speed ? <span>{Number(Math.round(Network))} Mbps</span> : <span>Checking speed...</span>}</span>
      
    
  );
};

export default TestNetworkSpeed;

// Utility function to track user answer, time spent, and response time
const trackUserResponse = (currentQuestion,selectedAnswer, startTime ) => {
   
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);

    console.log("reached here");
    
    
    return {
      currentQuestion: currentQuestion,
      response: selectedAnswer,
      responseTime: startTime,
      timeSpent: timeSpent,
    };
  };
  
  export default trackUserResponse;
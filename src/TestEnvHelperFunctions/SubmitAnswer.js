import { useSelector } from "react-redux";
import trackUserResponse  from "./TrackResponse";


export const handleSubmitAnswer = (questions, isStudent, selectedAnswers, startTimes,currentSectionQuestions,currentQuestion) => {
 
  console.log(questions);
  
  
  const response = {
   
    sectionWise:isStudent,
    response: []

  };
  

  if (isStudent) {
    questions.forEach((test) => {
      test.sections.forEach((section) => {  // Looping through sections
        const sectionType = section?.questionType?.toLowerCase();
        const isProgrammingSection = sectionType === "programming";
  
        const sectionResponse = {
          section: section.name,
          response: []
        };
  
        section?.questions?.forEach((question, index) => {
          // Generate question key based on section type
          const questionKey = isProgrammingSection 
            ? `programming-${index + 1}` 
            : `Q-${index + 1}`;
  
          const selectedAnswer = selectedAnswers[questionKey];
          const startTime = startTimes[questionKey];
          console.log(startTime);
          
          console.log(selectedAnswer);
          
  
          // Calculate time spent using responseTime from selectedAnswer or startTime
          const timeSpent = selectedAnswer?.responseTime 
            ? selectedAnswer.responseTime 
            : startTime 
              ? Number(((Date.now() - startTime) / 1000).toFixed(2))
              : 0;
  
          const userResponse = {
            currentQuestion: index + 1,
            response: selectedAnswer || null,
            questionId: question._id,
            timeSpent: timeSpent,
          };
  
          sectionResponse.response.push(userResponse);
        });
  
        response.response.push(sectionResponse);
        console.log(sectionResponse);
      });
    });
  }  else {
    // Test without sections
    questions?.forEach((question, index) => {
      const questionKey = `Q-${index + 1}`;
      const selectedAnswer = selectedAnswers[questionKey];
      const startTime = startTimes[questionKey];

      // Check if startTime is valid before calculating timeSpent
      const timeSpent = startTime ? Number(((performance.now() - startTime) / 1000).toFixed(2)) : 0;

      // Construct the user response for each question
      const userResponse = {
        currentQuestion: question.id,
        response: selectedAnswer || null,
        questionId : question._id,
        timeSpent: timeSpent,
      };

      // Push each question's response into the main response array
      response.response.push(userResponse);
    });
  }

  console.log(response);
  

  return response;
};


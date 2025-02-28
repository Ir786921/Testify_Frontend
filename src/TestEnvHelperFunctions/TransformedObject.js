export function transformSections(sectionArray) {

const sectionNames = sectionArray?.map(section => section.name);

const abc = sectionNames?.reduce((acc, name) => {
    acc[name] = []; // Initialize each key with an empty array
    return acc;
}, {});


    sectionArray?.forEach((section) => {
        section.questions?.forEach((question, qIndex) => {
            const formattedQuestion = {
                id: qIndex + 1, // Unique ID
                type: section.questionType.toLowerCase(), // Convert type to lowercase
                question: question.question,
                options: question.options || [], // Ensure options exist (for MCQ)
            };

            if (formattedQuestion.type === "mcq") {
                abc[section.name].push(formattedQuestion);
            } else if (formattedQuestion.type === "programming") {
                abc[section.name].push({
                    ...formattedQuestion,
                    description: question.description, // Default description
                    testCases: question.testCases.map((item)=>{
                       return  { input: item.input
                        .split(',')
                        .map(item => item.trim().split('='))
                        .reduce((acc, [key, value]) => {
                          acc[key.trim()] = Number(value.trim());
                          return acc;
                        }, {}), Output: item.output }
                    }) ,
                    
                });
            }
        });
    });

    console.log(abc);


    

    return abc;
}
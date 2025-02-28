import { createContext, useEffect, useState } from "react";
// import { AllTest } from "../assests/AllTest";


let AllTest = [];
let Aptitude = [];
let coding = [];
let Technical = [];
let foundation = [];
let role = [];
let YourTest = [];

async function getData (){
    const data = await fetch("http://localhost:8000/api/library");
    const response =  await data.json();
    AllTest = [...AllTest, ...response];
    Aptitude = AllTest.filter((ele) => ele.part === "Aptitude & Reasoning");
    coding = AllTest.filter((ele) => ele.part === "Coding Programming");
    Technical = AllTest.filter((ele) => ele.part === "Technical Assessment");
    foundation = AllTest.filter((ele) => ele.part === "Foundation schools");
    role = AllTest.filter((ele) => ele.part === "Domain Specific Roles");
    YourTest = AllTest.filter((ele) => ele.part === "Your Tests");
    
    
}

console.log(AllTest);




var i = 1;
AllTest.map((e)=>{
    return Object.assign(e,{id:i++});
})
const alltestContext = createContext({
    ALLTEST :AllTest,
    aptitude :Aptitude,
    technical:Technical,
    Foundation:foundation,
    newTest:YourTest,
    Role:role,
    Coding:coding,
    breadcrum:"All Tests",
    title:"bdsjgcjsg",
    duration:" ",
    instruction:" ",
    id:"",
    isSubmitted:false,
    


});
 export default alltestContext;
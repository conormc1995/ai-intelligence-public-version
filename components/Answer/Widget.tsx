import React, { useEffect, useState } from "react";
import styles from "./answer.module.css";

interface AnswerProps {
  text: string;
}

export const Answer: React.FC<AnswerProps> = ({ text }) => {
  const [words, setWords] = useState<string[]>([]);


  return (
    <>
        <div> 
      <div
        className="fixed flex flex-col z-50 bottom-[100px] top-0 right-0 h-auto left-0 sm:top-auto sm:right-5 sm:left-auto h-[calc(100%-95px)] w-full sm:w-[350px] overflow-auto min-h-[250px] sm:h-[600px] border border-gray-300 bg-white shadow-2xl rounded-md"
      >
      <div className="flex p-5 flex-col justify-center items-center h-32 bg-indigo-600">
        <h3 className="text-lg text-white">Alison Intelligence</h3>
        <p className="text-white opacity-50">Empowering Your Potential with AI</p>
      </div>
       <div className="bg-gray-50 flex-grow p-6"> 
         


       </div>
      </div>
      
      
      
      <button
        className="fixed z-40 right-5 bottom-5 shadow-lg flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full focus:outline-none hover:bg-indigo-600 focus:bg-indigo-600 transition duration-300 ease">
        <svg
          className="w-6 h-6 text-white absolute"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          ></path>
        </svg>

        <svg
          className="w-6 h-6 text-white absolute"
          x-show="open"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    
  </div>
    </>
  );
};





<button
className="fixed z-40 right-5 bottom-5 shadow-lg flex justify-center items-center w-14 h-14 bg-green-500 rounded-full focus:outline-none hover:bg-indigo-600 focus:bg-green-500 transition duration-300 ease">
<svg
  className="w-6 h-6 text-white absolute"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  ></path>
</svg>

<svg
  className="w-6 h-6 text-white absolute"
  x-show="open"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
</button>
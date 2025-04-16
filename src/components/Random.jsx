import React, { useState } from "react";
import Dishes from "../data/dishes";
import DishFromImage from "./DishFromImage";
import { IoCloseCircleSharp } from "react-icons/io5";



const Random = () => {
    const [hidden,setHidden] = useState(false);
    const hiddenShow = () => {
      setHidden((hidden) => !hidden);
    };
  return (
    <div className="flex justify-center items-center">
      <button onClick={hiddenShow} className="relative text-black cursor-pointer ring-2  ring-amber-600 font-semibold text-lg px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out ">
       
        <span className="relative z-10">Search From Image</span>
      </button>

      {hidden && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <DishFromImage/>
        <button onClick={hiddenShow} className="cursor-pointer absolute top-8 right-20 bg-white rounded"> <IoCloseCircleSharp
        className="text-4xl" />
        </button>
        </div>
      )}
      
    </div>
  );
};

export default Random;
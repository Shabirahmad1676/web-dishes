import React, { useState } from "react";
import dishes from "../data/dishes";

const Showcase = () => {
  // console.log(dishes);
  const [dish, setDish] = useState(null)
  const handleDish = (e)=>{
    e.preventDefault()
    // setDish((dish)=>dish,)
    setDish("")
  }

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const onlyText = inputValue.replace(/[0-9]/g, ""); // Remove digits
    setText(onlyText);
  }

  return (
    <div className="flex items-center justify-center flex-col font-black ">
      <h1>Your MealMatch</h1>
      <form onSubmit={handleDish} className="flex gap-4 items-center justify-center">
        <input
        onChange={handleChange}
        value={dish}
          type="text"
          placeholder="Enter ingredients you have...."
          className="w-60 border p-2"
          required
        />
        <button type="submit" className="border p-2 cursor-pointer">Add</button>
      </form>
    </div>
  );
};

export default Showcase;

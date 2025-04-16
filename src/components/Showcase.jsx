import React, { useEffect, useState } from "react";
import Dishes from "../data/dishes";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Recommended from "./Recommended";
import Search from "./Search";
import { TbSalt } from "react-icons/tb";
import Header from "./Header";
import { RiCloseFill } from "react-icons/ri";

const Showcase = () => {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [favourite, setFavourite] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    if (/\d/.test(input)) {
      setError("Numbers are not allowed in ingredients.");
      return;
    }
    setError("");

    if (input.trim() && !ingredients.includes(input.toLowerCase())) {
      setIngredients([...ingredients, input.toLowerCase()]);
    }
    setInput("");
  };

  const handleChange = (e) => {
    const inputtext = e.target.value;
    if (/\d/.test(inputtext)) {
      setError("Numbers are not allowed in ingredients.");
      setInput(inputtext.replace(/\d/g, ""));
    } else {
      setError("");
      setInput(inputtext);
    }
  };

  const removeIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const toggleFavourite = (dishName) => {
    if (favourite.includes(dishName)) {
      setFavourite(favourite.filter((name) => name !== dishName));
    } else {
      setFavourite([...favourite, dishName]);
    }
  };

  useEffect(() => {
    const matches = Dishes.filter((dish) =>
      dish.ingredients.every((ingredient) => ingredients.includes(ingredient))
    );
    setRecommended(matches);
  }, [ingredients]);

  useEffect(() => {
    const ingreds = JSON.parse(localStorage.getItem("ingredients"));
    const recommend = JSON.parse(localStorage.getItem("recommended"));
    const liked = JSON.parse(localStorage.getItem("favourite"));

    if (ingreds) {
      setIngredients(ingreds);
    }

    if (recommend) {
      setRecommended(recommend);
    }

    if (liked) {
      setFavourite(liked);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
    localStorage.setItem("recommended", JSON.stringify(recommended));
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [ingredients, recommended, favourite]);

  return (
    <div className="min-h-screen  flex flex-col items-center text-white font-sans p-6">
      {/* <Header/> */}

    <div className="rounded-lg mb-4 h-48 bg-white p-4 shadow-lg">
    <h1 className="text-3xl text-black font-extrabold  mb-4">🍽What's you have in Kitchen</h1>

    <form
        onSubmit={handleForm}
        className="flex flex-col md:flex-row mb-4 gap-4 items-center  justify-center w-[990px]"
      >
        <input
          type="text"
          placeholder="Enter ingredients..."
          value={input}
          onChange={handleChange}
          required
          className="w-full  p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-green-600 text-black p-3 rounded-lg  transition-transform transform hover:scale-105"
        >
          Add
        </button>
      </form>

      <div className=" text-black">
       {/* <div className="flex justify-center items-baseline"> */}
       {/* <h2 className="text-3xl font-semibold mb-4 text-center">  Your Ingredients  </h2> */}
       {/* <TbSalt className="text-2xl font-bold"/> */}
       {/* </div> */}
        <div className="flex flex-wrap gap-4">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center bg-sky-200 p-3 rounded-lg  shadow-sm"
            >
              <span className="mr-3">{ingredient}</span>
              <button
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                <RiCloseFill className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

      

      <Recommended  recommended={recommended} favourite={favourite} toggleFavourite={toggleFavourite} />
      <Search />
    </div>
  );
};

export default Showcase;
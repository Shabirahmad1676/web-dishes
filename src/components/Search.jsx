import React, { useState } from "react";
import Dishes from "../data/dishes";

const Search = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [filteredDishes, setFilteredDishes] = useState(Dishes);
  const [selectedDish, setSelectedDish] = useState(null); // For the popup

  const handleForm = (e) => {
    e.preventDefault();
    if (/\d/.test(search)) {
      setError("Numbers are not allowed in dish names.");
      return;
    }
    setError("");
    setSearch("");
  };

  const handleChange = (e) => {
    const inputtext = e.target.value;
    if (/\d/.test(inputtext)) {
      setError("Numbers are not allowed in dish names.");
      setSearch(inputtext.replace(/\d/g, ""));
    } else {
      setError("");
      setSearch(inputtext);
    }
  };

  const handleRemoveDish = (dishName) => {
    setFilteredDishes(filteredDishes.filter((dish) => dish.name !== dishName));
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish); // Open the popup with the selected dish
  };

  const closePopup = () => {
    setSelectedDish(null); // Close the popup
  };

  return (
    <div className="mt-6 min-h-screen flex flex-col items-center text-white font-sans p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Confused? Search for a Dish🍽!
      </h1>

      <form
        onSubmit={handleForm}
        className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8"
      >
        <input
          value={search}
          onChange={handleChange}
          className="w-full md:w-80 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Enter dish name..."
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

      <h2 className="text-3xl font-semibold mb-6 text-center">
        We Found These Dishes for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredDishes
          .filter((dish) =>
            dish.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((dish, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-black relative"
            >
              {/* X Icon to remove the dish */}
              <button
                onClick={() => handleRemoveDish(dish.name)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
              >
                ✖
              </button>

              {/* Dish card */}
              <img
                src={dish.image}
                alt={dish.name}
                className="w-40 h-40 object-cover rounded-lg mb-4 cursor-pointer"
                onClick={() => handleDishClick(dish)} // Open popup on click
              />
              <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
              <p className="text-sm text-gray-600">{dish.category}</p>
            </div>
          ))}
      </div>

      {filteredDishes.filter((dish) =>
        dish.name.toLowerCase().includes(search.toLowerCase())
      ).length === 0 && (
        <p className="text-lg text-gray-200 mt-6">
          No dishes found. Try searching for something else!
        </p>
      )}

      {/* Popup/Modal */}
      {selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-black relative">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
            >
              ✖
            </button>

            {/* Dish details */}
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedDish.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedDish.description || "No description available."}
            </p>
            <h4 className="text-lg font-semibold mb-2">Instructions:</h4>
            <p className="text-sm text-gray-800">
              {selectedDish.instructions || "No instructions available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
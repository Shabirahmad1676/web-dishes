import React, { useState } from "react";
import Dishes from "../data/dishes";

const Search = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [filteredDishes, setFilteredDishes] = useState(Dishes);
  const [selectedDish, setSelectedDish] = useState(null);
  const [show, setShow] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if (/\d/.test(search)) {
      setError("Numbers are not allowed in dish names.");
      return;
    }
    setError("");

    // Filter dishes based on the search input
    const filtered = Dishes.filter((dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDishes(filtered);
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
    setSelectedDish(dish);
  };

  const closePopup = () => {
    setSelectedDish(null);
  };

  const hiddenShow = () => {
    setShow((show) => !show);
  };

  return (
    <div className="flex flex-col items-center text-white w-full max-w-6xl mx-auto font-sans mt-8 p-6 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-6">
        🍽️ Confused What to Cook?
      </h1>
      <button
        onClick={hiddenShow}
        className="font-bold text-xl text-black bg-emerald-300 p-2 rounded-lg shadow cursor-pointer hover:bg-emerald-400 transition"
      >
        Let's Search
      </button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-lg shadow-lg w-[90%]  max-h-[90vh] overflow-y-auto p-6 relative text-black">
            {/* Search Form */}
            <button
                      onClick={() => hiddenShow()}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                    >
                      ✖
                    </button>
            <form
              onSubmit={handleForm}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
            >
              <input
                value={search}
                onChange={handleChange}
                className="w-full sm:w-96 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                type="text"
                placeholder="Enter dish name..."
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Search
              </button>
            </form>

            {/* Error Message */}
            {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

            {/* Results Section */}
            <h2 className="text-2xl sm:text-3xl font-semibold mt-10 mb-4 text-center text-gray-800">
              🍛 We Found These Dishes for You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-black relative transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    {/* Remove Dish Button */}
                    <button
                      onClick={() => handleRemoveDish(dish.name)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                    >
                      ✖
                    </button>

                    {/* Dish Card */}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-40 h-40 object-cover rounded-lg mb-4 cursor-pointer"
                      onClick={() => handleDishClick(dish)}
                    />
                    <h3 className="text-xl font-bold mb-1 text-center">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-gray-600">{dish.category}</p>
                  </div>
                ))
              ) : (
                <p className="text-red-600 text-lg font-medium col-span-full text-center mt-4">
                  No dishes found for "{search}" 😔
                </p>
              )}
            </div>

            {/* Modal / Popup */}
            {selectedDish && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300">
                <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto p-6 relative text-black">
                  {/* Close Button */}
                  <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                  >
                    ✖
                  </button>

                  {/* Dish Details */}
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{selectedDish.name}</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {selectedDish.description || "No description available."}
                  </p>
                  <h4 className="text-lg font-semibold mb-2">🧑‍🍳 Instructions:</h4>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {selectedDish.instructions || "No instructions available."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
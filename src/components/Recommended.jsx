import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Dishes from '../data/dishes';
import { BiDish } from 'react-icons/bi';

const Recommended = ({ recommended, favourite, toggleFavourite }) => {
  const [show, setShow] = useState(false); // For the popup visibility
  const [selectedDish, setSelectedDish] = useState(null); // For the selected dish details

  const showPop = (dish) => {
    setSelectedDish(dish); // Set the selected dish for the popup
    setShow(true); // Show the popup
  };

  const closePopup = () => {
    setShow(false); // Close the popup
    setSelectedDish(null); // Clear the selected dish
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 text-black">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Recommended Dishes 🍽👩🏽‍🍳
      </h2>
      {recommended.length > 0 ? (
        <div className="space-y-6">
          {recommended.map((dish, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center relative"
            >
              {/* X Icon to remove the dish */}
              <button
                onClick={() => toggleFavourite(dish.name)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
              >
                ✖
              </button>

              {/* Dish card */}
              <div
                onClick={() => showPop(dish)} // Open popup on click
                className="cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                  {favourite.includes(dish.name) ? (
                    <FaHeart
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the popup
                        toggleFavourite(dish.name);
                      }}
                      className="text-xl text-red-500 cursor-pointer"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the popup
                        toggleFavourite(dish.name);
                      }}
                      className="text-xl text-black cursor-pointer"
                    />
                  )}
                </div>
                <p className="text-sm mb-2">
                  {dish.description || 'No description available'}
                </p>
                <p className="text-sm italic mb-2">
                  {dish.instructions || 'No instructions available'}
                </p>
                {dish.image && (
                  <img
                    src={dish.image}
                    alt={`Image of ${dish.name}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="text-center mt-2">
                  <span className="block">
                    Cooking Time: {dish.prepTime} minutes
                  </span>
                  <span className="block">Servings: {dish.servings}</span>
                  <span className="block">Difficulty: {dish.difficulty}</span>
                  <span className="block">Category: {dish.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap items-center justify-center mx-auto cursor-pointer">
          {Dishes.slice(0, 3).map((dish, index) => (
            <div
              key={index}
              className="text-center"
              onClick={() => showPop(dish)} // Open popup on click
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="h-20 w-20 object-cover rounded-lg shadow-md"
              />
              <p className="font-bold mt-2">{dish.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Popup/Modal */}
      {show && selectedDish && (
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
            {selectedDish.image && (
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-2xl font-bold mb-2">{selectedDish.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedDish.description || 'No description available.'}
            </p>
            <h4 className="text-lg font-semibold mb-2">Instructions:</h4>
            <p className="text-sm text-gray-800">
              {selectedDish.instructions || 'No instructions available.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommended;
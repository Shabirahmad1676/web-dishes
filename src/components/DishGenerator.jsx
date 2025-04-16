import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DishGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(false);
  const GEMINI_API_KEY = "AIzaSyB2sxPFBLhYljqyKbTnegRVl29XaeG_udQ";
  const UNSPLASH_ACCESS_KEY = "_LUZJJl8bujFlRmFnejlzfH9FZGXvFphDRrbHrVW9YU";

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const handleForm = (e) => {
    const input = e.target.value;
    setIngredients(input.replace(/\d/g, "")); // Remove digits
  };

  const fetchDishImage = async (dishName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          dishName
        )}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      return (
        data.results[0]?.urls?.regular ||
        "https://source.unsplash.com/800x600/?food"
      );
    } catch (err) {
      console.error("Image fetch error:", err);
      return "https://source.unsplash.com/800x600/?food";
    }
  };

  const generateDish = async () => {
    setLoading(true);
    setDish(null);

    const prompt = `
      You are a chef assistant. Based on the following ingredients: ${ingredients},
      suggest a realistic dish. Respond in the following JSON format:
      {
        "dishName": "string",
        "cookingTime": "string (e.g. 30 minutes)",
        "type": "string (e.g. breakfast, lunch, dinner)",
        "category": ["string", ...],
        "ingredients": ["string", ...],
        "instructions": ["string", ...]
      }
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const cleaned = response.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (
        parsed.dishName &&
        parsed.cookingTime &&
        parsed.type &&
        parsed.category &&
        parsed.ingredients &&
        parsed.instructions
      ) {
        const imageUrl = await fetchDishImage(parsed.dishName);
        setDish({ ...parsed, imageUrl });
      } else {
        throw new Error("Incomplete API response");
      }
    } catch (err) {
      console.error("Generation error:", err);
      alert("Could not generate dish. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 mt-4 w-[1280px] mx-auto bg-white text-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        AI Dish Generator 🍴
      </h2>
      <p className="text-center text-black mb-6">
        Enter ingredients to generate a delicious dish!
      </p>
      <form className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          className="flex-1 bg-gray-800 text-gray-200 border border-gray-600 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="text"
          placeholder="Enter ingredients (e.g. eggs, milk, onion)"
          value={ingredients}
          onChange={handleForm}
        />
        <button
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white cursor-pointer px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          type="button"
          onClick={generateDish}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Dish"}
        </button>
      </form>

      {dish && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Flex Row for Image and Dish Details */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <img
              src={dish.imageUrl}
              alt={dish.dishName}
              className="w-64 h-64 object-cover rounded-lg shadow-md border border-gray-600"
            />
            <div className="text-left">
              <h3 className="text-3xl font-serif font-bold text-pink-400 mb-2">
                {dish.dishName}
              </h3>
              <p className="text-gray-300 mb-1 text-lg">
                <strong>Cooking Time:</strong> {dish.cookingTime}
              </p>
              <p className="text-gray-300 text-lg mb-1">
                <strong>Type:</strong> {dish.type}
              </p>
              <p className="text-gray-300 text-lg mb-4">
                <strong>Category:</strong> {dish.category.join(", ")}
              </p>
            </div>
          </div>

          {/* Flex Row for Ingredients and Instructions */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="text-2xl font-mono font-semibold text-yellow-400 mb-2">
                Ingredients:
              </h4>
              <ul className="list-disc ml-5 text-gray-300 mb-4">
                {dish.ingredients.map((item, idx) => (
                  <li className="text-lg" key={idx}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-mono font-semibold text-yellow-400 mb-2">
                Instructions:
              </h4>
              <ol className="list-decimal ml-5 text-gray-300">
                {dish.instructions.map((step, idx) => (
                  <li key={idx} className="mb-2 text-lg">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishGenerator;
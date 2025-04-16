import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DishFromImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [dishInfo, setDishInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyB2sxPFBLhYljqyKbTnegRVl29XaeG_udQ"; // Replace with your Gemini API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Convert image file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // Strip metadata
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setDishInfo(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setDishInfo(null);

    try {
      const base64Image = await fileToBase64(image);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: image.type,
            data: base64Image,
          },
        },
        `You're a chef AI. Analyze this food image and respond ONLY in JSON like this:
        {
          "dishName": "Dish name",
          "ingredients": ["ingredient 1", "ingredient 2", ...],
          "instruction": ["string", ...]
        }`,
      ]);

      const responseText = result.response.text();
      const cleaned = responseText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.dishName && parsed.ingredients) {
        setDishInfo(parsed);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Gemini Vision error:", err);
      alert("Failed to analyze image. Try a different one.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 mt-8  mx-auto h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Dish Detector from Image 📷
      </h2>
      <label
        htmlFor="fileInput"
        className="cursor-pointer mb-6 border-2 border-dashed border-gray-500 p-6 hover:border-blue-500 hover:bg-gray-800 transition duration-200 ease-in-out rounded-lg block w-full text-center"
      >
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <span className="text-gray-300 font-semibold">
          Drag & Drop or <span className="text-blue-400 underline">Upload</span>{" "}
          an Image
        </span>
      </label>

      {preview && (
        <div className="mb-6">
          <img
            src={preview}
            alt="Uploaded dish"
            className=" max-h-24 object-cover rounded-lg shadow-md border border-gray-600"
          />
        </div>
      )}

      <button
        onClick={analyzeImage}
        disabled={!image || loading}
        className={`px-6 py-3 rounded-lg shadow-md transition-transform duration-300 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {dishInfo && (
        <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-md  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            {dishInfo.dishName}
          </h3>
          <h4 className="text-xl font-semibold text-yellow-400 mb-2">
            Ingredients:
          </h4>
          <ul className="list-disc ml-5 text-gray-300 mb-4">
            {dishInfo.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h4 className="text-xl font-semibold text-yellow-400 mb-2">
            Instructions:
          </h4>
          <ol className="list-decimal ml-5 text-gray-300">
            {dishInfo.instruction.map((step, idx) => (
              <li key={idx} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default DishFromImage;
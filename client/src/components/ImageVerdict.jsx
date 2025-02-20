import React, { useState } from "react";
import axios from "axios";

const ImageVerdict = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/eco/api/v1/score",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Detailed error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6" name ="upload">
      {/* Image Upload Section */}
      <div className="mb-8 space-y-4 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-center"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-[200px] bg-NewAccent text-white py-2 px-4 rounded-lg hover:bg-NewComp disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Get Eco Score"}
        </button>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Selected Image:</h3>
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-w-full max-h-[300px] h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">Eco Score: {result.ecoScore}</div>
            <div className={`h-3 w-3 rounded-full ${
              result.ecoScore >= 7 ? 'bg-green-500' : 
              result.ecoScore >= 4 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Verdict</h3>
            <p className="text-gray-700">{result.verdict}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Suggestions</h3>
            <p className="text-gray-700">{result.suggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageVerdict;
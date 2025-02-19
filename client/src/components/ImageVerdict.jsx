import React, { useState } from "react";
import axios from "axios";

const ImageVerdict = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setImage(file);
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

    console.log("Starting upload...");
    try {
      console.log("Sending request to server...");
      const response = await axios.post(
        "http://localhost:3000/eco/api/v1/score",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
        }
      );

      console.log("Raw response:", response);
      console.log("Eco Score Response:", response.data);
      alert(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Detailed error:", error);
      setError(error.message);
      alert(`Failed to fetch eco score: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-[80%] flex-col h-[200px] flex items-center justify-center">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="my-5"
      />
      <button 
        onClick={handleUpload}
        className="border w-40 rounded-full h-11 bg-NewComp text-Comp my-4 flex items-center justify-center space-x-2"
      >
        {loading ? "Processing..." : "Get Eco Score"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default ImageVerdict;
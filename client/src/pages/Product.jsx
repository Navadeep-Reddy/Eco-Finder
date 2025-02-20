import React, { useState } from "react";
import { Star, Leaf, Shield, Package } from "lucide-react";
import one from '/home/navadeep/Documents/Projects/Eco-Finder/client/public/Product/one.jpg'
import two from '/home/navadeep/Documents/Projects/Eco-Finder/client/public/Product/two.jpg'
import three from '../../public/Product/three.webp'
const Product = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Eco-Friendly Bamboo Toothbrush",
    images: [
        one,
        two,
        three
    ],
    price: "₹249",
    ecoCertifications: ["USDA Organic", "Fair Trade", "Rainforest Alliance"],
    ingredients: ["Bamboo", "Plant-Based Bristles"],
    sustainabilityRating: 8.5,
    description: "A biodegradable toothbrush made from sustainably harvested bamboo and plant-based bristles, designed to reduce plastic waste.",
    reviews: [
      { user: "Amit", rating: 5, comment: "Great quality, very durable!" },
      { user: "Priya", rating: 4, comment: "Love the eco-friendly design." },
    ],
    features: [
      { icon: Leaf, text: "100% Biodegradable" },
      { icon: Shield, text: "BPA-Free" },
      { icon: Package, text: "Plastic-Free Packaging" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover flex justify-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-3xl font-semibold text-green-600 mt-2">
                {product.price}
              </p>
              <p className="text-gray-600 mt-4">{product.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-green-50 p-3 rounded-lg"
                >
                  <feature.icon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Eco-Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {product.ecoCertifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Sustainability Rating */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Sustainability Score</h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(Math.round(product.sustainabilityRating / 2))].map(
                    (_, idx) => (
                      <Star
                        key={idx}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}
                </div>
                <span className="text-lg font-medium">
                  {product.sustainabilityRating}/10
                </span>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
            <p className="text-gray-600 mb-6">
              What our customers are saying about this product
            </p>
            <div className="space-y-6">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-lg space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-medium">
                        {review.user[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.user}</h4>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
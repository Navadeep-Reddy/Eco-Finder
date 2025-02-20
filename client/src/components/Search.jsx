import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4" name="searcher">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Product Name Or Description.."
            className="w-full px-12 py-3 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-NewComp transition-all duration-300 placeholder-gray-400"
          />
          <SearchIcon 
            className="absolute left-4 text-gray-400" 
            size={20}
          />
          <button
            type="submit"
            className="absolute right-3 px-4 py-1.5 bg-NewAccent text-white rounded-full hover:bg-NewComp transition-colors duration-300 text-sm font-medium"
            onClick={() => {navigate('/login');}}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
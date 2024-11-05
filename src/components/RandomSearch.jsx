import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const API_KEY_SEARCH = import.meta.env.VITE_GIPHY_API_KEY_SEARCH;

const RandomSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gifUrl, setGifUrl] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function getGifUrl(term) {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY_SEARCH}&q=${term}&limit=1&offset=0&rating=g&lang=en`;
      const response = await axios.get(url);
      const image = response.data.data[0]?.images.original.url;

      if (image) {
        setGifUrl(image);
      } else {
        setError("No GIFs found for this keyword. Try another search.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Error fetching GIF. Please try again.");
        }
      } else {
        setError("Error fetching GIF. Please check your network connection.");
      }
      console.error("Error fetching GIF:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const clickHandler = () => {
    if (searchTerm) {
      setGifUrl(null); 
      getGifUrl(searchTerm);
    } else {
      setError("Please enter a search term.");
    }
  };

  return (
    <div className="w-11/12 max-w-[600px] bg-yellow-100 rounded-md mt-5 mx-auto p-5 flex flex-col items-center">
      <h1 className="font-bold text-xl sm:text-3xl text-center">Search for a Gif</h1>

      <div className="flex w-full mt-3 justify-center items-center">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-0 mr-2"
        />
        <button
          onClick={clickHandler}
          className="w-auto px-4 py-2 bg-red-500 text-white font-semibold rounded"
        >
          Search
        </button>
      </div>

      <div className="w-full min-h-[300px] rounded overflow-hidden mx-auto mt-3 flex items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : gifUrl ? (
          <img
            src={gifUrl}
            alt="Random Gif"
            className="w-[350px] h-[300px] object-contain"
          />
        ) : (
          <p className="text-gray-500">Please enter a search term above.</p> 
        )}
      </div>
    </div>
  );
};

export default RandomSearch;

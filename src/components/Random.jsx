import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const Random = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gifUrl, setGifUrl] = useState(null);
  const [error, setError] = useState(null);
  async function getGifUrl() {
    setIsLoading(true); 
    setError(null);
    try {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
      const response = await axios.get(url);
      const image = response.data.data.images.original.url;
      setGifUrl(image);
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

  useEffect(() => {
    getGifUrl();
    console.log("Created by : Raunak Kaushal ❤");
  }, []);

  const clickHandler = () => {
    setGifUrl(null); 
    getGifUrl();
  };

  return (
    <div className="w-11/12 max-w-[600px] bg-yellow-100 rounded-md mt-5 mx-auto p-5 flex flex-col items-center">
      <h1 className="font-bold text-xl sm:text-3xl text-center">Random Gif</h1>

      <div className="w-full min-h-[250px] max-h-[300px] rounded overflow-hidden mx-auto mt-3 flex items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error}</p> // Show error message
        ) : (
          <img
            src={gifUrl}
            alt="Random Gif"
            className="w-[350px] h-[300px] object-contain"
          />
        )}
      </div>

      <button
        onClick={clickHandler}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded mt-4"
      >
        Generate
      </button>
    </div>
  );
};

export default Random;

import React, { useState } from "react";
import Random from "./components/Random";
import RandomSearch from "./components/RandomSearch";
import Navbar from "./components/Navbar";

const App = () => {
  const [isactiveButton, setIsActiveButton] = useState("random");

  const handleButtonClick = (button) => {
    setIsActiveButton(button);
  };

  return (
    <div className="flex flex-col items-center w-full bg-blue-500 min-h-screen mx-auto p-5">
      <Navbar />
      <div className="flex justify-around items-center w-full max-w-[600px] mt-5 bg-white rounded-md shadow-lg p-[0.5rem]">
        <button
          onClick={() => handleButtonClick("random")}
          className={`flex-1 mx-2 px-4 py-2 font-semibold rounded transition-colors duration-300 ease-in-out ${
            isactiveButton === "random"
              ? "bg-green-500 text-white"
              : "bg-transparent text-green-500"
          }`}
        >
          Random
        </button>

        <button
          onClick={() => handleButtonClick("search")}
          className={`flex-1 mx-2 px-4 py-2 font-semibold rounded transition-colors duration-300 ease-in-out ${
            isactiveButton === "search"
              ? "bg-green-500 text-white"
              : "bg-transparent text-green-500"
          }`}
        >
          Search
        </button>
      </div>
      <div className="mt-2 w-full max-w-[600px]">
        {isactiveButton === "random" ? <Random /> : <RandomSearch />}
      </div>
    </div>
  );
};

export default App;

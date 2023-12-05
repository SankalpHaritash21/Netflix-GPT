import React from "react";
import background from "../img/Loading.jpg";
import { Netflix_Logo } from "../utils/constant";

const customBackgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Loading = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-screen flex flex-col items-center justify-center text-white select-none"
    >
      <div>
        <img src={Netflix_Logo} alt="Logo" className="w-30 h-24" />
      </div>
      <div className="text-xl animate-pulse">Loading...</div>
    </div>
  );
};

export default Loading;

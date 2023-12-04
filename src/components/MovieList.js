import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import leftA from "../img/left-arrow.png";
import rightA from "../img/right-arrow.png";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="px-10 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <Slider ref={sliderRef} {...sliderSettings} className="overflow-hidden">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            id={movie.id}
          />
        ))}
      </Slider>
      <div className="mt-2 flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-white text-white mr-2 -translate-y-32 -translate-x-10 rounded-full h-10 w-10"
        >
          <img src={leftA} alt="Left Arrow" />
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-white -translate-y-32 translate-x-3 rounded-full h-10 w-10"
        >
          <img src={rightA} alt="Right Arrow" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;

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
    infinite: false, // Set infinite to false to disable infinite movement
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
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

  const filteredMovies = movies?.filter((item) => item.poster_path !== null);
  return (
    <div className="px-5 lg:px-7">
      <h1 className="text-sm lg:text-lg md:text-2xl py-4 text-white">
        {title}
      </h1>
      <Slider ref={sliderRef} {...sliderSettings} className="overflow-hidden">
        {filteredMovies?.map((movie) => (
          <MovieCard
            key={movie.id}
            title={title}
            posterPath={movie.poster_path}
            id={movie.id}
          />
        ))}
      </Slider>
      <div className="hidden mt-2 md:flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-white text-white -translate-y-28 md:-translate-y-32 -translate-x-8 rounded-full h-10 w-10"
        >
          <img src={leftA} alt="Left Arrow" />
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-white -translate-y-28  lg:-translate-y-32 lg:translate-x-6 translate-x-4 rounded-full h-10 w-10"
        >
          <img src={rightA} alt="Right Arrow" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;

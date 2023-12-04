import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftA from "../img/left-arrow.png";
import rightA from "../img/right-arrow.png";
import { API_OPTIONS } from "../utils/constant";
import CastCard from "./CastCard";

const Cast = ({ id }) => {
  const sliderRef = useRef(null);
  const [cast, setCast] = useState(null);

  const Cast = async () => {
    const d = await fetch(
      `
        https://api.themoviedb.org/3/movie/${id}/credits`,
      API_OPTIONS
    );

    const json = await d.json();
    console.log(json.cast);
    setCast(json.cast);
  };

  useEffect(() => {
    Cast();
  }, []);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 9,
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
    <div className="px-10 p-4">
      <Slider ref={sliderRef} {...sliderSettings} className="overflow-hidden">
        {cast?.map((item) => (
          <CastCard
            key={item.id}
            profilePath={item.profile_path}
            id={item.id}
            name={item.name}
          />
        ))}
      </Slider>
      <div className="mt-2 flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-white text-white mr-2 -translate-y-36 -translate-x-10 rounded-full h-10 w-10"
        >
          <img src={leftA} alt="Left Arrow" />
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-white -translate-y-36 translate-x-1 rounded-full h-10 w-10"
        >
          <img src={rightA} alt="Right Arrow" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default Cast;

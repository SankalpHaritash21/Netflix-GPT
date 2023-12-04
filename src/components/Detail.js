import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constant";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import TriangleImage from "../img/navigate-back-white.svg";
import Cast from "./Cast";

const Detail = () => {
  const [view, setView] = useState(false);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const { id } = useParams();
  useMovieTrailer(id);
  const [details, setDetails] = useState(null);

  const detail = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        API_OPTIONS
      );
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await data.json();
      setDetails(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    detail();
  }, []);

  const handleView = () => {
    setView(!view);
  };
  if (!details) {
    return <p>Loading...</p>;
  }

  const {
    original_title,
    poster_path,
    overview,
    runtime,
    budget,
    vote_average,
    popularity,
    genres,
  } = details;
  return (
    <div
      className="bg-black min-h-screen opacity-90
     flex flex-col text-white"
    >
      <div className="flex items-start pt-4 h-10 overflow-hidden p-3 lg:pl-10">
        <img
          src={TriangleImage}
          alt="goback"
          className="bg-black text-white w-3 h-3 md:w-6 md:h-6 hover:cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>
      <div className="flex font-bold text-sm lg:text-3xl justify-center text-center text-white">
        {original_title}
      </div>
      <div className="p-4">
        <div className=" bg-black text-white pt-5 justify-between flex">
          <div className=" w-[100rem] h-[30rem] flex items-center justify-center mt-16 overflow-hidden">
            {!view && poster_path && (
              <img
                alt="Movie Card"
                src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                className="rounded-2xl w-fit h-[30rem]"
              />
            )}
            {view && (
              <div className="w-full flex items-center justify-center">
                <iframe
                  className="w-[30rem] h-[30rem] top-40 left-10"
                  src={
                    "https://www.youtube.com/embed/" +
                    trailerVideo?.key +
                    "?&autoplay=1&mute=1"
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            )}
          </div>

          <div className="gap-y-5 py-4 flex flex-col items-center text-lg h-fit p-3">
            <div className="text-left my-2">{overview}</div>

            <div className="flex flex-col items-start w-full">
              <div className="my-3 mt-5">
                runtime: {(runtime / 60).toFixed(2)}hr
              </div>
              <div className="my-2">budget: {budget / 1000000}Cr.</div>
              <div className="my-2">
                language: {details?.spoken_languages[0]?.name}
              </div>
              <div className="my-2">vote: {vote_average}/10</div>
              <div className="my-2">popular: {popularity}</div>
            </div>
            <div className="mt-2 w-full">
              <div className="mb-5">genres:</div>
              <div>
                {genres.map((item) => (
                  <span
                    key={item.id}
                    className="border-2 border-white bg-white text-black rounded-2xl p-2 ml-3"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleView}
              className="border-2 border-white bg-white text-black rounded-2xl px-4 py-2 mt-3"
            >
              {view ? "Hide" : "Show"} Trailer
            </button>
          </div>
        </div>

        <div className="flex flex-col text-white mt-10">
          <div className="flex items-start justify-center pl-0 text-3xl font-semibold p-2">
            Casts:
          </div>
          <div className="mt-5">
            <Cast id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

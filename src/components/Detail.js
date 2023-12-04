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

  return (
    <div className="bg-black min-h-screen opacity-90 min-w-full flex flex-col">
      <div className="flex w-full items-start pt-2 h-10 overflow-hidden pl-10">
        <img
          src={TriangleImage}
          alt="goback"
          className="bg-black text-white w-6 h-6 hover:cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>

      <div className="">
        <div className=" bg-black text-white pt-5 justify-between flex">
          <div className=" w-[100rem] h-[30rem] flex items-center justify-center mt-16 overflow-hidden">
            {!view && details?.poster_path && (
              <img
                alt="Movie Card"
                src={"https://image.tmdb.org/t/p/w500/" + details.poster_path}
                className="rounded-2xl w-fit h-[30rem]"
              />
            )}
            {view && (
              <iframe
                className=" w-[30rem] h-[30rem] my-1 absolute top-40 left-10"
                src={
                  "https://www.youtube.com/embed/" +
                  trailerVideo?.key +
                  "?&autoplay=1&mute=1"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
          </div>

          <div className="gap-y-10 py-4 flex flex-col items-center text-lg h-fit">
            {details && (
              <>
                <div className="flex font-bold text-3xl text-center">
                  {details.original_title}
                </div>

                <div className="gap-x-10">
                  <div className="text-left my-2">{details.overview}</div>
                  <div className="my-3 mt-5">
                    runtime: {(details.runtime / 60).toFixed(2)}hr
                  </div>
                  <div className="my-2">
                    budget: {details?.budget / 1000000}Cr.
                  </div>
                  <div className="my-2">
                    language: {details?.spoken_languages[0]?.name}
                  </div>
                  <div className="my-2">vote: {details?.vote_average}/10</div>
                  <div className="my-2">popular: {details?.popularity}</div>
                  <div className="mt-4">
                    <div className="mb-7">genres:</div>
                    <div>
                      {details?.genres.map((item) => (
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
                    className="border-2 border-white bg-white text-black rounded-2xl px-4 py-2 mt-10 "
                  >
                    {view ? "Hide" : "Show"} Trailer
                  </button>
                </div>
              </>
            )}
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

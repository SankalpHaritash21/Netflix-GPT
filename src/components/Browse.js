import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcoming from "../hooks/useUpcoming";
import useTrendingMovies from "../hooks/useTrendingMovie";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useWebSeries from "../hooks/useWebSeries";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcoming();
  useTrendingMovies();
  useHorrorMovies();
  useWebSeries();

  return (
    <div className="bg-black select-none">
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
      - MainContainer
        - VideoBackground
        - Videotitle
      - SecondaryContainer
        - Movielist*n 
        - cards*n 
       */}
    </div>
  );
};

export default Browse;

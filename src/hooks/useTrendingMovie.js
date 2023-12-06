import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrending } from "../utils/movieSlice";

const useTrendingMovies = () => {
  // Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getTrandingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addTrending(json.results));
  };

  useEffect(() => {
    getTrandingMovies();
  }, []);
};

export default useTrendingMovies;

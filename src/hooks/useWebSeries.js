import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addWebSeries } from "../utils/movieSlice";

const useWebSeries = () => {
  // Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getWebSeries = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addWebSeries(json.results));
  };

  useEffect(() => {
    getWebSeries();
  }, []);
};

export default useWebSeries;

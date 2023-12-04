import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcoming } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcoming = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const up = useSelector((store) => store.movies.upcoming);

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcoming(json.results));
  };

  useEffect(() => {
    !up && getUpcomingMovies();
  }, []);
};

export default useUpcoming;

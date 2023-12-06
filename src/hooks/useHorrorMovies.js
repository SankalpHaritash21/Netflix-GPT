import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addHorror } from "../utils/movieSlice";

const useHorrorMovies = () => {
  // Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getHorrorMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=horror&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addHorror(json.results));
  };

  useEffect(() => {
    getHorrorMovies();
  }, []);
};

export default useHorrorMovies;

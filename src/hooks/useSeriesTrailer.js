import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo, addWebSeriesTrailer } from "../utils/movieSlice";

const useSeriesTrailer = (SeriesId) => {
  const dispatch = useDispatch();

  const getSeriesVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${SeriesId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addWebSeriesTrailer(trailer));
  };
  useEffect(() => {
    getSeriesVideo();
  }, []);
};

export default useSeriesTrailer;

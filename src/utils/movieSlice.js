import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
    upcoming: null,
    trending: null,
    horror: null,
    webSeries: null,
    seriesTrailer: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    addTrending: (state, action) => {
      state.trending = action.payload;
    },
    addHorror: (state, action) => {
      state.horror = action.payload;
    },
    addWebSeries: (state, action) => {
      state.webSeries = action.payload;
    },
    addWebSeriesTrailer: (state, action) => {
      state.seriesTrailer = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addUpcoming,
  addTrending,
  addHorror,
  addWebSeries,
  addWebSeriesTrailer,
} = moviesSlice.actions;

export default moviesSlice.reducer;

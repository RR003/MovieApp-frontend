import * as api from "../api";

import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_URL });

export const getMovieInfo = (movieId) => async (dispatch) => {
  try {
    const { data } = await api.getMovieInfo(movieId);
    dispatch({ type: "GET_MOVIE_INFO", payload: data });
  } catch (error) {}
};

export const getMovieImage = (movieId) => async (dispatch) => {
  try {
    const { data } = await api.getMovieImage(movieId);
    dispatch({ type: "GET_MOVIE_IMAGE", payload: data });
  } catch (error) {}
};

export const deleteMovieWatchList = (movieId, username) => async (dispatch) => {
  try {
    await api.deleteMovieWatchList(movieId, username);
    dispatch({ type: "DELETE_MOVIE", payload: movieId });
  } catch (error) {}
};

export const deleteTvWatchList = (tvId, username) => async (dispatch) => {
  try {
    await api.deleteTVWatchList(tvId, username);
    dispatch({ type: "DELETE_TV", payload: tvId });
  } catch (error) {}
};

export const getRecomendationsForMovies = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCustomRecs(username);

    dispatch({ type: "SET_REC_MOVIES", payload: data });
  } catch (error) {}
};

export const getRecomendationsForTv = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCustomRecsTv(username);

    dispatch({ type: "SET_REC_TV", payload: data });
  } catch (error) {}
};

export const getPopularMovies = () => async (dispatch) => {
  try {
    const { data } = await API.get("/movie/popularMovies");
    return data;
  } catch (error) {}
};

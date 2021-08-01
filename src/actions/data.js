import * as api from "../api";

export const getUserInfo = (username) => async (dispatch) => {
  try {
    const { data } = await api.getUserInfoData(username);
    dispatch({ type: "FETCH_USER_DATA", payload: data });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
console.log();

export const addToWatchListMovie = (username, movieId) => async (dispatch) => {
  try {
    await api.addMovieToWatchList(username, movieId);
    const movieImage = await api.getMovieImage(movieId);
    const movieInfo = await api.getMovieInfo(movieId);
    let data = [movieInfo.data, movieImage.data];
    dispatch({ type: "ADD_TO_WATCH_LIST_MOVIE", payload: movieId });
    dispatch({ type: "ADD_TO_WL_MOVIE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addToWatchListTv = (username, tvId) => async (dispatch) => {
  try {
    await api.addTvToWatchList(username, tvId);
    const tvImage = await api.getTvImage(tvId);
    const tvInfo = await api.getTvInfo(tvId);
    let data = [tvInfo.data, tvImage.data];
    dispatch({ type: "ADD_TO_WATCH_LIST_TV", payload: tvId });
    dispatch({ type: "ADD_TO_WL_TV", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editWatchedList = (username, movieId, rating, comment) => async (
  dispatch
) => {
  try {
    await api.editWatchedList(username, movieId, rating, comment);
    const data = {
      id: movieId,
      rating: rating,
      comment: comment,
    };
    dispatch({ type: "EDIT_WATCHED_LIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addToWatchedList = (username, id, isMovie) => async (dispatch) => {
  try {
    console.log(username, id, isMovie);
    await api.addToWatchedList(username, id, isMovie);
    dispatch(getUserInfo(username));
  } catch (error) {}
};

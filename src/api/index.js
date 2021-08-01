import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_URL });

export const getToken = (formData) => API.post("/user/login", formData);
export const signIn = (formData) => API.post("/user/login", formData);
export const signup = (formData) => API.post("/user/create", formData);

export const getUserInfoData = (username) => API.get(`/user/${username}`);

export const getMovieInfo = (movieId) => API.get(`/movie/get/${movieId}`);
export const getMovieImage = (movieId) => API.get(`/movie/getImage/${movieId}`);
export const getTvInfo = (tvId) => API.get(`/tv/get/${tvId}`);
export const getTvImage = (tvId) => API.get(`tv/getImage/${tvId}`);
export const gettingPopularMovies = (fakeParam) => {
  API.get("/movie/popularMovies").then((res) => console.log(res));
};

export const deleteMovieWatchList = (movieId, username) => {
  API.delete("/user/deleteWatchList", {
    data: {
      movieId: movieId,
      username: username,
      isMovie: "yes",
    },
  });
};

export const deleteTVWatchList = (tvId, username) =>
  API.delete("/user/deleteWatchList", {
    data: {
      username: username,
      movieId: tvId,
      isMovie: "no",
    },
  });

export const getCustomRecs = (username) =>
  API.get(`/movie/recommendations/${username}`);

export const getCustomRecsTv = (username) =>
  API.get(`/tv/recommendations/${username}`);

export const getCommentAndRatingMovie = (id) =>
  API.get(`/movie/comment&rating/${id}`);

export const getCommentAndRatingTv = (id) => API.get(`tv/comment&rating/${id}`);

export const getRatingsMovie = (id) => API.get(`/movie/rating/${id}`);

export const getRatingsTv = (id) => API.get(`/tv/rating/${id}`);

export const addMovieToWatchList = (username, id) =>
  API.post(`/user/addWatchList`, {
    username: username,
    movieId: id,
    isMovie: "yes",
  });

export const addToWatchedList = (username, id, isMovie) => {
  API.post("/user/addWatchedList", {
    username: username,
    movieId: id,
    dateCreated: new Date(),
    rating: -1,
    comment: "",
    isMovie: isMovie,
  });
};

export const addTvToWatchList = (username, id) =>
  API.post(`/user/addWatchList`, {
    username: username,
    movieId: id,
    isMovie: "no",
  });

export const editWatchedList = (username, id, rating, comment) => {
  API.put(`/user/updateWatchedList`, {
    username: username,
    movieId: id,
    rating: rating,
    comment: comment,
  });
};

export const signInWithGoogle = (id_token) =>
  API.post("/user/googleSignIn", {
    url: id_token,
  });

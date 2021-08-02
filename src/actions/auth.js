import * as api from "../api";
import { getUserInfo } from "../actions/data";

import { getRecomendationsForMovies, getRecomendationsForTv } from "./movie";

export function signIn(formData, router) {
  return async function (dispatch) {
    try {
      const { data } = await api.signIn(formData);

      let token = data.url;

      if (token.length > 30) {
        localStorage.setItem("token", token);
        sessionStorage.setItem("username", formData.username);
        dispatch({ type: "AUTH", payload: data });
        // let { data2 } = dispatch(getUserInfo(formData.username));
        // console.log("login data is right here = " + data2);
        dispatch(getUserInfo(sessionStorage.getItem("username"))).then(
          async function (user_data) {
            let movieWatchListInfo = [];
            let movieWatchListImages = [];
            let tvWatchListInfo = [];
            let tvWatchListImages = [];

            for (let i = 0; i < user_data.watchList.length; i++) {
              let movie = await api.getMovieInfo(user_data.watchList[i]);
              let image = await api.getMovieImage(user_data.watchList[i]);
              movieWatchListInfo.push(movie.data);
              movieWatchListImages.push(image.data);
            }
            let movieList = [movieWatchListInfo, movieWatchListImages];
            dispatch({ type: "CREATE_WATCH_LIST_MOVIE", payload: movieList });
            // console.log(movieWatchListInfo, movieWatchListImages);

            for (let i = 0; i < user_data.tvWatchList.length; i++) {
              let movie = await api.getTvInfo(user_data.tvWatchList[i]);
              let image = await api.getTvImage(user_data.tvWatchList[i]);
              tvWatchListInfo.push(movie.data);
              tvWatchListImages.push(image.data);
            }
            let tvList = [tvWatchListInfo, tvWatchListImages];
            dispatch({ type: "CREATE_WATCH_LIST_TV", payload: tvList });

            dispatch(getRecomendationsForMovies(formData.username)).then(() => {
              dispatch(getRecomendationsForTv(formData.username)).then(() => {
                router.push("/");
              });
            });
          }
        );

        // const user_data = useSelector((state) => state.user);
      }
      return token;
    } catch (error) {}
  };
}

export const checkToken = () => async () => {
  let settings = {
    method: "GET",
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  let urls = process.env.REACT_APP_URL;
  let data = await fetch(urls + "/user/test", settings);
  let newData = await data.json();
  if (newData.url !== "valid") {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  }
  return newData.url;
};

export function signInWithGoogle(id_token, router) {
  return async function (dispatch) {
    let { data } = await api.signInWithGoogle(id_token);
    if (data.verificationCode.length > 30) {
      localStorage.setItem("token", data.verificationCode);
      sessionStorage.setItem("username", data.username);

      dispatch({ type: "AUTH", data });
      // let { data2 } = dispatch(getUserInfo(formData.username));
      // console.log("login data is right here = " + data2);
      dispatch(getUserInfo(sessionStorage.getItem("username"))).then(
        async function (user_data) {
          let movieWatchListInfo = [];
          let movieWatchListImages = [];
          let tvWatchListInfo = [];
          let tvWatchListImages = [];

          for (let i = 0; i < user_data.watchList.length; i++) {
            let movie = await api.getMovieInfo(user_data.watchList[i]);
            let image = await api.getMovieImage(user_data.watchList[i]);
            movieWatchListInfo.push(movie.data);
            movieWatchListImages.push(image.data);
          }
          let movieList = [movieWatchListInfo, movieWatchListImages];
          dispatch({ type: "CREATE_WATCH_LIST_MOVIE", payload: movieList });
          // console.log(movieWatchListInfo, movieWatchListImages);

          for (let i = 0; i < user_data.tvWatchList.length; i++) {
            let movie = await api.getTvInfo(user_data.tvWatchList[i]);
            let image = await api.getTvImage(user_data.tvWatchList[i]);
            tvWatchListInfo.push(movie.data);
            tvWatchListImages.push(image.data);
          }
          let tvList = [tvWatchListInfo, tvWatchListImages];
          dispatch({ type: "CREATE_WATCH_LIST_TV", payload: tvList });

          dispatch(getRecomendationsForMovies(data.username)).then(() => {
            dispatch(getRecomendationsForTv(data.username)).then(() => {
              router.push("/");
            });
          });
        }
      );
    }
  };
}

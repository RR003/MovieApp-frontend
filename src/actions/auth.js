import * as api from "../api";
import { getUserInfo } from "../actions/data";
import { useDispatch, useSelector } from "react-redux";
import tvWatchlist from "../reducers/tvWatchlist";
import { getRecomendationsForMovies, getRecomendationsForTv } from "./movie";

export function signIn(formData, router) {
  console.log(router);
  return async function (dispatch) {
    try {
      const { data } = await api.signIn(formData);
      // console.log(data);
      let token = data.url;
      console.log(token);
      if (token.length > 30) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", formData.username);
        dispatch({ type: "AUTH", data });
        // let { data2 } = dispatch(getUserInfo(formData.username));
        // console.log("login data is right here = " + data2);
        dispatch(getUserInfo(sessionStorage.getItem("username"))).then(
          async function (user_data) {
            console.log(user_data);
            let movieWatchListInfo = [];
            let movieWatchListImages = [];
            let tvWatchListInfo = [];
            let tvWatchListImages = [];
            console.log(user_data);
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
                console.log(router);
                router.push("/");
              });
            });
          }
        );

        // const user_data = useSelector((state) => state.user);
      }
      return token;
    } catch (error) {
      console.log(error);
    }
  };
}

export const checkToken = () => async () => {
  console.log(sessionStorage.getItem("token"));
  let settings = {
    method: "GET",
    headers: {
      token: sessionStorage.getItem("token"),
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
      sessionStorage.setItem("token", data.verificationCode);
      sessionStorage.setItem("username", data.username);

      dispatch({ type: "AUTH", data });
      // let { data2 } = dispatch(getUserInfo(formData.username));
      // console.log("login data is right here = " + data2);
      dispatch(getUserInfo(sessionStorage.getItem("username"))).then(
        async function (user_data) {
          console.log(user_data);
          let movieWatchListInfo = [];
          let movieWatchListImages = [];
          let tvWatchListInfo = [];
          let tvWatchListImages = [];
          console.log(user_data);
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
              console.log(router);
              router.push("/");
            });
          });
        }
      );
    }
  };
}

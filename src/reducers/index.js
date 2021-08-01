import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import movieWatchlist from "./movieWatchlist";
import tvWatchlist from "./tvWatchlist";
import popularMovies from "./popularMovies";
import recMovies from "./recMovies";
import recTv from "./recTv";

export default combineReducers({
  auth,
  user,
  movieWatchlist,
  tvWatchlist,
  popularMovies,
  recMovies,
  recTv,
});

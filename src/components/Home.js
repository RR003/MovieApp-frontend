import React, { Component, useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import "../Home.css";
import ParticleBackground from "./ParticleBackground";
import Button from "@material-ui/core/Button";
import Recomendation from "./Recomendation";
import Footer from "./Footer";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../actions/data";
import {
  deleteMovieWatchList,
  deleteTvWatchList,
  getPopularMovies,
} from "../actions/movie";
import { goToThisMovie, goToThisTv } from "../actions/recs";
import { getMovieInfo, getMovieImage } from "../actions/movie";
import PopularMoviesRec from "./AllRecs";
import movieWatchlist from "../reducers/movieWatchlist";
import { useHistory } from "react-router-dom";
import { checkToken } from "../actions/auth";

const Home = (props) => {
  let breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2, itemsToScroll: 2 },
    { width: 1000, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1300, itemsToShow: 4, itemsToScroll: 4 },
  ];

  const dispatch = useDispatch();
  if (sessionStorage.getItem("token") !== null) dispatch(checkToken());

  const history = useHistory();

  const user2 = useSelector((state) => state.user);
  const [movieWatchLists, setMovieWatchLists] = useState(
    useSelector((state) => state.movieWatchlist)
  );
  console.log(movieWatchLists);

  const [tvWatchLists, setTvWatchLists] = useState(
    useSelector((state) => state.tvWatchlist)
  );

  let user = [];
  try {
    console.log(user2);
    if (user2.length > 0) {
      user = user2[0];
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
    console.log(user2);
  }

  const [isWL, setIsWL] = useState(true);
  const [isRec, setRec] = useState(false);

  // console.log(movieWatchListImages);

  let watchlist = true;
  let recommend = false;
  const [onMovies, setOnMovies] = useState(true);
  const [onTV, setOnTV] = useState(false);

  const changeToMovie = () => {
    setOnTV(false);
    setOnMovies(true);

    document.getElementById("showingMovies").style.background = "coral";
    document.getElementById("showingTv").style.background = "";
  };

  const changeToTv = () => {
    console.log("changing to tv");
    setOnMovies(false);
    setOnTV(true);

    console.log(onMovies, onTV);
    document.getElementById("showingTv").style.background = "coral";
    document.getElementById("showingMovies").style.background = "";
  };

  const getMovie = (e) => {
    let index = e.currentTarget.value;
    let id = user.watchList[index];
    dispatch(goToThisMovie(id, history));
  };

  const getTv = (e) => {
    console.log(user.tvWatchList);
    let index = e.currentTarget.value;
    let id = user.tvWatchList[index];
    dispatch(goToThisTv(id, history));
  };

  const clickImage = (e) => {
    let index = e.currentTarget.value;
    console.log(user.tvWatchList);
    let id = user.watchList[index];
    dispatch(goToThisMovie(id, history));
  };

  const clickTvImage = (e) => {
    let index = e.currentTarget.value;
    if (index === undefined) index = e.target.value;
    console.log(e);
    let id = user.tvWatchList[index];
    dispatch(goToThisTv(id, history));
  };

  const DeleteMovie = (e) => {
    console.log("deleting movie...");
    let movieId = e.currentTarget.value;
    let index = -1;
    let movielist = movieWatchLists[0];
    for (let i = 0; i < movielist.length; i++) {
      if (movielist[i].id === parseInt(movieId)) index = i;
    }
    let movie1 = movieWatchLists[0];
    let movie2 = movieWatchLists[1];
    movie1.splice(index, 1);
    movie2.splice(index, 1);
    setMovieWatchLists([movie1, movie2]);
    dispatch(deleteMovieWatchList(movieId, user.username));
  };

  const deleteTv = (e) => {
    console.log("deleting tv show");
    let tvId = e.currentTarget.value;
    let index = -1;
    let tvlist = tvWatchLists[0];
    for (let i = 0; i < tvlist.length; i++) {
      if (tvlist[i].id === parseInt(tvId)) index = i;
    }
    let tv1 = tvWatchLists[0];
    let tv2 = tvWatchLists[1];
    tv1.splice(index, 1);
    tv2.splice(index, 1);
    setTvWatchLists([tv1, tv2]);
    dispatch(deleteTvWatchList(tvId, user.username));
  };

  const changeToRecommend = () => {
    setIsWL(false);
    setRec(true);
    document.getElementById("recommendButton").style.background = "#346566";
    document.getElementById("watchlistButton").style.background = "";
  };

  const changeToWatchlist = () => {
    setRec(false);
    setIsWL(true);
    document.getElementById("watchlistButton").style.background = "#346566";
    document.getElementById("recommendButton").style.background = "";
  };

  const signUp = () => {
    this.props.history.push({
      pathname: "/signUp",
    });
  };

  {
    let i = -1;
    let j = -1;
    let k = 0;
    let signedIn = true;
    // console.log(onMovies, onTV);
    try {
      if (
        user.username === undefined ||
        user.username === null ||
        user.username === ""
      ) {
        signedIn = false;
      }
    } catch (error) {
      signedIn = false;
    }

    return (
      <div id="ALLITEMS">
        <div id="without-footer">
          <div id="all">
            {console.log(movieWatchLists)}
            <div>
              <NavBar id={user}></NavBar>
            </div>

            <div>
              {!signedIn && (
                <center>
                  <h1 id="info">Welcome to SHOWBINGE</h1>
                  <div id="blurb">
                    <h3>Never know what to binge?</h3>
                    <p>
                      Keep track of movies and shows you want to watch with the
                      help of Showbinge. Not only that, but also get customed
                      recomendations and connect with your friends. Just one
                      click away to create your Showbinge account and get
                      started to binging away!
                    </p>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={signUp}
                      id="create-account-button"
                    >
                      Create An Account
                    </Button>
                    <p>
                      (Please be patient when logging / signing in, since server
                      is also deployed in heroku and takes time to start)
                    </p>
                  </div>
                  <div id="popMovies">
                    <h3>Popular Movies Today</h3>
                    <div id="carousel">
                      <PopularMoviesRec type="popularMovie" history={history} />
                    </div>
                  </div>
                </center>
              )}

              {signedIn && (
                <center>
                  <div>
                    <center class="intro">
                      <h1>
                        Welcome {user.firstName} {user.lastName}
                      </h1>
                      <Button id="watchlistButton" onClick={changeToWatchlist}>
                        Watch List
                      </Button>

                      <Button id="recommendButton" onClick={changeToRecommend}>
                        See Recomendations
                      </Button>
                    </center>
                    {isWL && (
                      <div>
                        <div id="watchlist">
                          <Button id="showingMovies" onClick={changeToMovie}>
                            Movies
                          </Button>
                          <Button id="showingTv" onClick={changeToTv}>
                            TV Shows
                          </Button>
                          <br></br>
                          <br></br>
                          {onMovies &&
                            movieWatchLists[0].map((movie) => (
                              <div id="theWatchedMovie">
                                {console.log("hello my name is sally")}
                                {movieWatchLists[1][i + 1].url !== "-1" ? (
                                  <input
                                    type="image"
                                    src={movieWatchLists[1][i + 1].url}
                                    id="image"
                                    onClick={clickImage}
                                    value={i + 1}
                                  />
                                ) : (
                                  <input
                                    id="image"
                                    type="image"
                                    src="https://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg"
                                    onClick={clickTvImage}
                                    value={i + 1}
                                  ></input>
                                )}

                                <center>
                                  <Button
                                    id="movieButton"
                                    color="primary"
                                    variant="contained"
                                    value={++i}
                                    onClick={getMovie}
                                  >
                                    {movie.title.length <= 35 && movie.title}
                                    {movie.title.length > 35 &&
                                      movie.title.substring(0, 35) + "..."}
                                  </Button>

                                  <Button
                                    id="delete"
                                    value={movie.id}
                                    onClick={DeleteMovie}
                                    color="primary"
                                    variant="contained"
                                  >
                                    Remove
                                  </Button>
                                </center>

                                <br></br>
                              </div>
                            ))}

                          {onTV &&
                            tvWatchLists[0].map((t) => (
                              <div id="theWatchedMovie">
                                {console.log(j)}
                                {tvWatchLists[1][j + 1].url !== "-1" ? (
                                  <input
                                    type="image"
                                    src={tvWatchLists[1][j + 1].url}
                                    id="image"
                                    onClick={clickTvImage}
                                    value={j + 1}
                                  />
                                ) : (
                                  <input
                                    type="image"
                                    id="image"
                                    src="https://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg"
                                    onClick={clickTvImage}
                                    value={j + 1}
                                  ></input>
                                )}

                                <center>
                                  <Button
                                    id="movieButton"
                                    color="primary"
                                    variant="contained"
                                    value={++j}
                                    onClick={getTv}
                                  >
                                    {t.title.length <= 35 && t.title}
                                    {t.title.length > 35 &&
                                      t.title.substring(0, 35) + "..."}
                                  </Button>

                                  <Button
                                    id="delete"
                                    value={t.id}
                                    onClick={deleteTv}
                                    color="primary"
                                    variant="contained"
                                  >
                                    Remove
                                  </Button>
                                </center>

                                <br></br>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}{" "}
                    {isRec && (
                      <div>
                        <Recomendation history={history} />
                      </div>
                    )}
                  </div>
                </center>
              )}
            </div>
          </div>

          <ParticleBackground id="particles" />
        </div>
        <div id="app-footer">
          <Footer data={user} />
        </div>
      </div>
    );
  }
};

export default Home;

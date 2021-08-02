import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";

import "../MovieInfo.css";
import Button from "@material-ui/core/Button";
import ParticleBackground from "./ParticleBackground";
import Footer from "./Footer";
import { addToWatchListMovie, addToWatchedList } from "../actions/data";
import { deleteMovieWatchList } from "../actions/movie";

const MovieInfo = (props) => {
  const user2 = useSelector((state) => state.user);
  const movieInfo = props.location.state.newState;
  const commentsAndRatings = props.location.state.commentAndRatings;
  const ourRating = props.location.state.ourRating;
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [movieWatchLists, setMovieWatchLists] = useState(
    useSelector((state) => state.movieWatchlist)
  );

  useEffect(() => {
    if (user2.length === 0) {
      setMessage("Create an account to add to your watch/watched lists");
      document.getElementById("watch").style.visibility = "hidden";
      document.getElementById("watched").style.visibility = "hidden";
    } else {
      if (user2[0].watchList.includes(movieInfo.id)) {
        setMessage("Movie is currently in your watchlist");
        document.getElementById("watch").style.visibility = "hidden";
      } else {
        for (let i = 0; i < user2[0].watchedList.length; i++) {
          if (user2[0].watchedList[i].movieId === movieInfo.id) {
            setMessage("You already watched this movie");
            document.getElementById("watch").style.visibility = "hidden";
            document.getElementById("watched").style.visibility = "hidden";
          }
        }
      }
    }
  });

  const [showOverview, setShowOverview] = useState(false);
  const [showRatings, setShowRatings] = useState(false);

  const [button1test, setButton1] = useState("show overview");
  const [button2test, setButton2] = useState("show comments and ratings");

  let user = [];
  if (user2.length > 0) user = user2[0];
  const addToWatchList = () => {
    dispatch(addToWatchListMovie(user.username, movieInfo.id));
    setMessage("Movie has been added to your watchlist");
    document.getElementById("watch").style.visibility = "hidden";
  };
  const addToWatchedListFunc = async () => {
    let watchlist = user.watchList;
    let movielist = movieWatchLists[0];
    let index = -1;
    for (let i = 0; i < movielist.length; i++) {
      if (movieInfo.id === movielist[i].id) {
        index = i;
        await dispatch(deleteMovieWatchList(movieInfo.id, user.username));
      }
    }
    let movie1 = movieWatchLists[0];
    let movie2 = movieWatchLists[1];
    movie1.splice(index, 1);
    movie2.splice(index, 1);
    setMovieWatchLists([movie1, movie2]);
    await dispatch(addToWatchedList(user.username, movieInfo.id, "yes"));
    setMessage("Movie has been added to your watched list");
    document.getElementById("watch").style.visibility = "hidden";
    document.getElementById("watched").style.visibility = "hidden";
  };

  const showOverviewFunction = () => {
    if (showOverview === false) {
      setShowOverview(true);
      setButton1("remove overview");
    } else {
      setShowOverview(false);
      setButton1("show overview");
    }
  };

  const showRatingsFunction = () => {
    if (showRatings === false) {
      setShowRatings(true);
      setButton2("remove comments and ratings");
    } else {
      setShowRatings(false);
      setButton2("show comments and ratings");
    }
  };

  return (
    <div id="ALLITEMS">
      <div id="without-footer">
        <div>
          <NavBar id={user}></NavBar>
          <div id="everything">
            <center>
              <h1>Movie Information for {movieInfo.title}</h1>
              <h2>{message}</h2>

              <div id="signedIn">
                <div id="watch">
                  <Button id="addWatchList" onClick={addToWatchList}>
                    Add to Watch List
                  </Button>
                </div>

                <div id="watchedDiv">
                  <Button id="watched" onClick={addToWatchedListFunc}>
                    I watched this movie
                  </Button>
                  <h3></h3>
                </div>
              </div>

              <Button
                color="primary"
                variant="outlined"
                onClick={showOverviewFunction}
              >
                {button1test}
              </Button>
              {showOverview && (
                <div id="information">
                  <table id="movieInfoTable">
                    <tbody>
                      <tr>
                        <td>Date Released</td>
                        <td>{movieInfo.releaseDate}</td>
                      </tr>
                      <tr>
                        <td>Overview</td>
                        <td>{movieInfo.overview}</td>
                      </tr>
                      <tr>
                        <td>General Rating</td>
                        <td>{movieInfo.rating} / 10</td>
                      </tr>
                      <tr>
                        <td>MovieSite Rating</td>
                        {ourRating === -1 ? (
                          <td>this movie has not been user-rated yet</td>
                        ) : (
                          <td>
                            Our Rating : {Math.round(10 * ourRating) / 10} / 5
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </center>

            <br></br>
            <div>
              <center>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={showRatingsFunction}
                >
                  {button2test}
                </Button>
                {showRatings && (
                  <div>
                    {commentsAndRatings.length === 0 ? (
                      <h2>There have been no ratings</h2>
                    ) : (
                      <table id="ratingTable">
                        <thead>
                          <tr id="header">
                            <th>Rating</th>
                            <th>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {commentsAndRatings.map((comment) => (
                            <tr id="movieWatched" key={comment}>
                              <td>{comment[1]} / 5</td>

                              <td>{comment[0]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </center>
            </div>
          </div>
        </div>

        <ParticleBackground />
      </div>
      <div id="app-footer">
        <Footer data={user} />
      </div>
    </div>
  );
};

export default MovieInfo;

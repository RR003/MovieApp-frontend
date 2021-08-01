import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import axios from "axios";
import * as api from "../api";
import "../WatchedList.css";
import Ratings from "./Ratings";
import ParticleBackground from "./ParticleBackground";
import Footer from "./Footer";
import { checkToken } from "../actions/auth";

const WatchedList = () => {
  const [user, setUser] = useState(useSelector((state) => state.user[0]));
  const dispatch = useDispatch();
  console.log(user);

  const [showRating, setShowRating] = useState(false);
  const [movieTitles, setMovieTitles] = useState([]);

  const [ratingTitle, setRatingTitle] = useState("");
  const [ratingId, setRatingId] = useState("");

  useEffect(async () => {
    let tempList = [];
    try {
      let isValid = await dispatch(checkToken());
      console.log(isValid);
      if (isValid === "valid") {
        for (let x = 0; x < user.watchedList.length; x++) {
          if (user.watchedList[x].isMovie === "yes") {
            let res = await api.getMovieInfo(user.watchedList[x].movieId);
            tempList.push(res.data.title);
            // tempList.push(data.title);
          } else {
            let res = await api.getTvInfo(user.watchedList[x].movieId);
            tempList.push(res.data.title);
          }
        }
        setMovieTitles(tempList);
      } else {
        setUser(undefined);
      }
    } catch (error) {}
  }, []);

  const clickedGiveRating = (event) => {
    let index = event.target.value;
    console.log(index);
    setShowRating(true);
    setRatingId(user.watchedList[index - 1].movieId);
    setRatingTitle(movieTitles[index - 1]);
  };

  let i = 0;
  return (
    <div id="ALLITEMS">
      <div id="without-footer">
        <div id="all">
          <NavBar id={user}></NavBar>
          {user === undefined && (
            <div id="signedOut">
              <h1>You are not signed in to view your watched list</h1>
            </div>
          )}
          {user !== undefined && (
            <div id="signedIn">
              <center id="center">
                <div id="left">
                  <h1>Watched List</h1>
                  <div id="Total">
                    <table id="movieTable">
                      <thead>
                        <tr id="header">
                          <th>Movie Title</th>
                          <th>Date Watched</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.watchedList.map((wl) => (
                          <tr id="movieWatched">
                            <td>{movieTitles[i++]}</td>
                            <td>{wl.dateCreated.substring(0, 10)}</td>
                            {wl.rating === -1 ? (
                              <td>
                                <button
                                  id="giveRating"
                                  value={i}
                                  onClick={clickedGiveRating}
                                >
                                  Give Rating
                                </button>
                              </td>
                            ) : (
                              <td>{wl.rating} / 5</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div>
                      {showRating && (
                        <Ratings
                          movieId={ratingId}
                          title={ratingTitle}
                          user={user}
                          id="RatingsComp"
                        ></Ratings>
                      )}
                    </div>
                  </div>
                </div>
              </center>
            </div>
          )}
        </div>
        <ParticleBackground />
      </div>
      <div id="app-footer">
        <Footer data={user} />
      </div>
    </div>
  );
};

export default WatchedList;

import React, { Component } from "react";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import Button from "@material-ui/core/Button";
import PopularMoviesRec from "./AllRecs";
import PopularMovies from "./AllRecs";

const Recomendation = (state) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2, itemsToScroll: 2 },
    { width: 1000, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1300, itemsToShow: 4, itemsToScroll: 4 },
  ];

  return (
    <div>
      <div>
        <h3>Movie Recomendations Customed For You</h3>
        <PopularMoviesRec
          type="movieRec"
          history={state.history}
          id="carousel"
        />
      </div>

      <br></br>
      <div>
        <h3>TV Shows Recomendations Customed For You</h3>
        <PopularMoviesRec type="tvRec" history={state.history} id="carousel" />
      </div>

      <div>
        <h3>Popular Movies Today</h3>
        <PopularMoviesRec
          type="popularMovie"
          history={state.history}
          id="carousel"
        />
      </div>
    </div>
  );
};

export default Recomendation;

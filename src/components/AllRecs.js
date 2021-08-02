import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import popularMovies from "../reducers/popularMovies";
import {
  deleteMovieWatchList,
  deleteTvWatchList,
  getPopularMovies,
} from "../actions/movie";
import { goToThisMovie, goToThisTv } from "../actions/recs";
import { useHistory } from "react-router-dom";

const PopularMovies = (state) => {
  const dispatch = useDispatch();
  const recMovies = useSelector((state) => state.recMovies);
  const recTv = useSelector((state) => state.recTv);

  const [popularImages, setPopularImages] = useState([]);
  const [popularTitles, setPopularTitles] = useState([]);
  const [popularIds, setPopularIds] = useState([]);

  useEffect(() => {
    if (state.type === "popularMovie") {
      // console.log("iufehgjlwihlj");
      dispatch(getPopularMovies()).then((res) => {
        if (res !== undefined) {
          setPopularIds(res[0]);
          setPopularTitles(res[1]);
          setPopularImages(res[2]);
        }
      });
    } else if (state.type === "movieRec") {
      setPopularIds(recMovies[0]);
      setPopularTitles(recMovies[1]);
      setPopularImages(recMovies[2]);
    } else if (state.type === "tvRec") {
      setPopularIds(recTv[0]);
      setPopularTitles(recTv[1]);
      setPopularImages(recTv[2]);
    }
  }, [dispatch]);

  let breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 650, itemsToShow: 2, itemsToScroll: 2 },
    { width: 1000, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1300, itemsToShow: 4, itemsToScroll: 4 },
  ];

  const clickPopImage = (e) => {
    e.preventDefault();
    let index = e.currentTarget.value;
    let id = popularIds[index];
    if (state.type === "tvRec") {
      dispatch(goToThisTv(id, state.history));
    } else {
      dispatch(goToThisMovie(id, state.history));
    }
  };

  const clickPopTitle = (e) => {
    e.preventDefault();
    let index = e.currentTarget.value;
    let id = popularIds[index];
    if (state.type === "tvRec") {
      dispatch(goToThisTv(id, state.history));
    } else {
      dispatch(goToThisMovie(id, state.history));
    }
  };

  let k = 0;
  return (
    <div id="carousel">
      <Carousel breakPoints={breakPoints}>
        {popularImages.map((image) => (
          <div>
            <div>
              {image !== "-1" ? (
                <input
                  type="image"
                  src={image}
                  id="image"
                  value={k}
                  onClick={clickPopImage}
                ></input>
              ) : (
                <img
                  id="image"
                  src="https://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg"
                  value={k}
                ></img>
              )}
            </div>
            <Button
              id="movieButton"
              color="primary"
              variant="contained"
              onClick={clickPopTitle}
              value={k}
            >
              {popularTitles[k].length <= 35 && popularTitles[k]}
              {popularTitles[k].length > 35 &&
                popularTitles[k].substring(0, 35) + "..."}
            </Button>
            {console.log(k++)}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default PopularMovies;

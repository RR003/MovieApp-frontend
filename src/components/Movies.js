import React, { Component, useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import "../Movies.css";
import ParticleBackground from "./ParticleBackground";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import { goToThisMovie, goToThisTv } from "../actions/recs";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Movies = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // States
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [data, setData] = useState("");
  const [images, setImages] = useState([]);
  const [tvImages, setTvImages] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [url, setUrl] = useState([]);
  const [showMov, setShowMov] = useState(true);
  const [showTv, setShowTv] = useState(false);
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("pageNumber"))
  );

  const [tvCurrentPage, setTvCurrentPage] = useState(
    parseInt(localStorage.getItem("tvPageNumber"))
  );
  console.log(tvCurrentPage);
  const [tvTotalPages, setTvTotalPages] = useState("");
  const [button, setButton] = useState([]);
  const [tvButton, setTvButton] = useState([]);

  useEffect(() => {
    let url = process.env.REACT_APP_URL;
    setUrl(url);
    let list = JSON.parse(localStorage.getItem("list"));
    // console.log(this.state);
    setMovies(list);
    // console.log(this.state);
    setMovie(localStorage.getItem("title"));
    // console.log(this.state);
    setData(JSON.parse(localStorage.getItem("data")));
    setImages(JSON.parse(localStorage.getItem("images")));
    setTvList(JSON.parse(localStorage.getItem("tvList")));
    setTvImages(JSON.parse(localStorage.getItem("tvImages")));
    setTotalPages(JSON.parse(localStorage.getItem("total_pages")));
    setTvTotalPages(JSON.parse(localStorage.getItem("tv_total_pages")));
    createButtons(JSON.parse(localStorage.getItem("total_pages")), currentPage);
    tvCreateButtons(
      JSON.parse(localStorage.getItem("tv_total_pages")),
      tvCurrentPage
    );

    if (tvList.length > movies.length) {
      this.setShowMov(false);
      this.setShowTv(true);
      document.getElementById("tvButton").style.background = "#346566";
    } else {
      document.getElementById("themovieButton").style.background = "#346566";
    }
  }, []);

  const clickedButton = (e) => {
    let index = e.currentTarget.value;
    axios.get(url + `/movie/${movie}/${index}`).then((res) => {
      console.log(res);
      setMovies(res.data[0]);
      setImages(res.data[1]);
      setCurrentPage(parseInt(index));
      createButtons(totalPages, parseInt(index));
    });
  };

  const tvClickedButton = (e) => {
    let index = e.currentTarget.value;

    axios.get(url + `/tv/${movie}/${index}`).then((res) => {
      console.log(res);
      setTvList(res.data[0]);
      setTvImages(res.data[1]);
      setCurrentPage(parseInt(index));
      tvCreateButtons(tvTotalPages, parseInt(index));
    });
  };

  const getMovie = (e) => {
    let index = e.currentTarget.value;
    localStorage.setItem("dataForMovieInfo", data);
    axios.get(url + `/movie/${movie}/${currentPage}/${index}`).then((res) => {
      dispatch(goToThisMovie(res.data.id, history));
    });
  };

  const clickImage = (e) => {
    let index = e.currentTarget.value;
    localStorage.setItem("dataForMovieInfo", data);
    axios.get(url + `/movie/${movie}/${currentPage}/${index}`).then((res) => {
      dispatch(goToThisMovie(res.data.id, history));
    });
  };

  const clickTvImage = (event) => {
    let index = event.target.value;
    localStorage.setItem("dataForMovieInfo", data);
    axios.get(url + `/tv/${movie}/${tvCurrentPage}/${index}`).then((res) => {
      console.log(res);
      dispatch(goToThisTv(res.data.id, history));
      // console.log(this.state.username)
      /*this.props.history.push({
        pathname: "/TvInfo",
        state: {
          newState: res.data,
          data: this.state.data,
        },
      });*/
    });
  };

  const getTv = (e) => {
    let index = e.currentTarget.value;

    localStorage.setItem("dataForMovieInfo", data);
    axios.get(url + `/tv/${movie}/${tvCurrentPage}/{${index}`).then((res) => {
      dispatch(goToThisTv(res.data.id, history));
      /*console.log(res.data);
      // console.log(this.state.username)
      this.props.history.push({
        pathname: "/TvInfo",
        state: {
          newState: res.data,
          data: this.state.data,
        },
      });*/
    });
  };

  const tvCreateButtons = (tvTotalPages, tvCurrentPage) => {
    let pages = [];

    if (tvTotalPages < 6) {
      for (let i = 1; i <= tvTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (tvCurrentPage < 4) {
        for (let i = 1; i <= tvCurrentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(tvTotalPages);
      } else {
        pages.push(1);
        pages.push("...");
        if (tvCurrentPage + 3 > tvTotalPages) {
          for (let i = tvCurrentPage - 2; i <= tvTotalPages; i++) {
            pages.push(i);
          }
        } else {
          for (let i = tvCurrentPage - 2; i <= tvCurrentPage + 2; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(tvTotalPages);
        }
      }
    }
    console.log(pages);
    setTvButton(pages);
  };

  const createButtons = (total_pages, currentPage) => {
    console.log(total_pages, currentPage);
    console.log(total_pages, currentPage);
    let pages = [];

    if (total_pages < 6) {
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 4) {
        for (let i = 1; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total_pages);
      } else {
        pages.push(1);
        pages.push("...");
        if (currentPage + 3 > total_pages) {
          for (let i = currentPage - 2; i <= total_pages; i++) {
            pages.push(i);
          }
        } else {
          for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(total_pages);
        }
      }
    }
    console.log(pages);
    setButton(pages);
  };

  const changeToTV = () => {
    setShowMov(false);
    setShowTv(true);
    document.getElementById("tvButton").style.background = "#346566";
    document.getElementById("themovieButton").style.background = "";
  };
  const changeToMovies = () => {
    setShowTv(false);
    setShowMov(true);
    document.getElementById("themovieButton").style.background = "#346566";
    document.getElementById("tvButton").style.background = "";
  };

  let i = -1;
  let j = -1;
  let showMovies = true;
  if (movies.length === 0 && tvList.length === 0) {
    showMovies = false;
  }
  return (
    <div id="ALLITEMS">
      <div id="without-footer">
        <div id="all">
          <NavBar id={data}></NavBar>
          {!showMovies && (
            <div>
              <h1>No search results...</h1>
              <h3>Make sure your spelling is accurate</h3>
            </div>
          )}
          <br></br>
          <center>
            <Button id="themovieButton" onClick={changeToMovies}>
              Movies
            </Button>
            <Button id="tvButton" onClick={changeToTV}>
              TV Shows
            </Button>
          </center>

          <center>
            {showMovies && showMov && (
              <div>
                <h3>
                  {movies.length} Movie Search Results for "{movie}"
                </h3>
                {movies.map((movie) => (
                  <div id="theMovies">
                    <div>
                      <center>
                        {images[i + 1] !== "-1" ? (
                          <input
                            type="image"
                            src={images[i + 1]}
                            onClick={clickImage}
                            value={i + 1}
                            id="image"
                          />
                        ) : (
                          <input
                            type="image"
                            id="image"
                            src={images[i + 1]}
                            onClick={clickImage}
                            value={i + 1}
                            src="https://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg"
                          ></input>
                        )}
                      </center>

                      <br></br>
                      <center>
                        <Button
                          id="movieTitle"
                          value={++i}
                          onClick={getMovie}
                          color="primary"
                          variant="contained"
                        >
                          {movie.length <= 50 && movie}
                          {movie.length > 50 && movie.substring(0, 50) + "..."}
                        </Button>
                      </center>
                      <br></br>
                    </div>
                  </div>
                ))}
                <div>
                  {button.map((index) =>
                    index !== "..." ? (
                      index === currentPage ? (
                        <Button
                          value={index}
                          color="primary"
                          variant="contained"
                          onClick={clickedButton}
                        >
                          {index}
                        </Button>
                      ) : (
                        <Button
                          value={index}
                          variant="contained"
                          onClick={clickedButton}
                        >
                          {index}
                        </Button>
                      )
                    ) : (
                      <Button value={index} variant="contained">
                        {index}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
          </center>

          <center>
            {showMovies && showTv && (
              <div>
                <h3>{tvList.length} TV Show Search Results</h3>
                {tvList.map((tv) => (
                  <div id="theMovies">
                    <div>
                      <center>
                        {tvImages[j + 1] !== "-1" ? (
                          <input
                            type="image"
                            src={tvImages[j + 1]}
                            onClick={clickTvImage}
                            value={j + 1}
                            id="image"
                          />
                        ) : (
                          <input
                            type="image"
                            id="image"
                            onClick={clickTvImage}
                            value={j + 1}
                            src="https://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg"
                          ></input>
                        )}
                      </center>

                      <br></br>
                      <center>
                        <Button
                          id="movieTitle"
                          value={++j}
                          onClick={getTv}
                          color="primary"
                          variant="contained"
                        >
                          {tv.length <= 50 && tv}
                          {tv.length > 50 && tv.substring(0, 50) + "..."}
                        </Button>
                      </center>
                      <br></br>
                    </div>
                  </div>
                ))}

                <div>
                  {tvButton.map((index) =>
                    index !== "..." ? (
                      index === currentPage ? (
                        <Button
                          value={index}
                          color="primary"
                          variant="contained"
                          onClick={tvClickedButton}
                        >
                          {index}
                        </Button>
                      ) : (
                        <Button
                          value={index}
                          variant="contained"
                          onClick={tvClickedButton}
                        >
                          {index}
                        </Button>
                      )
                    ) : (
                      <Button value={index} variant="contained">
                        {index}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
          </center>
        </div>
        <ParticleBackground />
      </div>
      <div id="app-footer">
        <Footer data={data} />
      </div>
    </div>
  );
};

export default Movies;

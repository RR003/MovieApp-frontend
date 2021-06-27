import React, { Component } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import "../MovieInfo.css";
import Button from "@material-ui/core/Button";
import ParticleBackground from "./ParticleBackground";
import Footer from "./Footer";

class MovieInfo extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    id: this.props.location.state.newState.id,
    movie: this.props.location.state.newState.title,
    overview: this.props.location.state.newState.overview,
    data: this.props.location.state.data,
    dateReleased: this.props.location.state.newState.releaseDate,
    rating: this.props.location.state.newState.rating,
    show: true,
    ourRating: "",
    commentsAndRatings: "",
    message2: "",
    url: "",
    showOverview: false,
    showRatings: false,
    button1test: "show overview",
    button2test: "show ratings and comments",
    showThisMessage: false,
  };

  async componentDidMount() {
    let url = process.env.REACT_APP_URL;

    this.setState({ url: url });
    let ratings = await fetch(url + `/movie/rating/${this.state.id}`);
    ratings = await ratings.json();
    if (ratings === -1) {
      ratings = "no ratings yet";
    }
    this.setState({ ourRating: ratings });
    let commentsAndRatings = await fetch(
      url + `/movie/comment&rating/${this.state.id}`
    );
    commentsAndRatings = await commentsAndRatings.json();
    console.log(commentsAndRatings);
    this.setState({ commentsAndRatings: commentsAndRatings });
    let settings = {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };

    let response = await fetch(url + "/user/test", settings);
    let authData = await response.json();
    if (this.state.data !== {} && this.state.data !== undefined) {
      // console.log(this.state.data);
      if (
        this.state.data.username === undefined ||
        this.state.data.username === null ||
        authData.url !== "valid"
      ) {
        document.getElementById("signedIn").style.visibility = "hidden";
        this.setState({ showThisMessage: true });
      } else {
        console.log(this.state.data.watchedList);
        console.log(this.state.id);
        let isThere = false;
        for (let i = 0; i < this.state.data.watchedList.length; i++) {
          if (
            this.state.data.watchedList[i].movieId === this.state.id &&
            this.state.data.watchedList[i].isMovie === "yes"
          ) {
            document.getElementById("watch").style.visibility = "hidden";
            document.getElementById("watched").style.visibility = "hidden";
            console.log("1");
            isThere = true;
            break;
          }
        }
        if (isThere) {
          document.getElementById("alreadyWatched").style.visibility =
            "visible";
        }

        for (let i = 0; i < this.state.data.watchList.length; i++) {
          if (
            this.state.data.watchList[i] === this.state.id &&
            this.state.data.watchedList[i].isMovie === "yes"
          ) {
            document.getElementById("watch").style.visibility = "hidden";
            console.log("2");
            break;
          }
        }
      }
    } else {
      this.setState({ showThisMessage: true });
    }
  }

  addToWatchList = () => {
    // console.log(this.state.data.watchist);
    if (this.state.data.username === undefined) {
      console.log("please log in");
    } else {
      let list = this.state.data.watchList;
      let isThere = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.state.id) {
          isThere = true;
          break;
        }
      }
      if (isThere) {
        this.setState({ show: true });
      } else {
        axios.post(this.state.url + "/user/addWatchList", {
          username: this.state.data.username,
          movieId: this.state.id,
          isMovie: "yes",
        });

        setTimeout(this.goToHome, 100);
      }
    }
  };

  addToWatchedList = () => {
    console.log(this.state.url);
    let list = this.state.data.watchList;
    for (let i = 0; i < list.length; i++) {
      if (this.state.id === list[i]) {
        axios.delete(this.state.url + "/user/deleteWatchList", {
          data: {
            username: this.state.data.username,
            movieId: this.state.id,
            isMovie: "yes",
          },
        });
      }
    }

    axios.post(this.state.url + "/user/addWatchedList", {
      username: this.state.data.username,
      movieId: this.state.id,
      dateCreated: new Date(),
      rating: -1,
      comment: "",
      isMovie: "yes",
    });

    setTimeout(this.goToWatchList, 100);
  };

  goToWatchList = () => {
    this.props.history.push({
      pathname: "/watchedList",
      state: this.state.data,
    });
  };

  goToHome = () => {
    this.props.history.push({
      pathname: "/",
      state: this.state.data,
    });
  };

  showOverview = () => {
    if (this.state.showOverview === false) {
      this.setState({ showOverview: true });
      this.setState({ button1test: "remove overview" });
    } else {
      this.setState({ showOverview: false });
      this.setState({ button1test: "show overview" });
    }
  };

  showRatings = () => {
    if (this.state.showRatings === false) {
      this.setState({ showRatings: true });
      this.setState({ button2test: "remove ratings and comments" });
    } else {
      this.setState({ showRatings: false });
      this.setState({ button2test: "show ratings and comments" });
    }
  };

  render() {
    return (
      <div>
        <div>
          <NavBar id={this.state.data}></NavBar>
          <div id="everything">
            <center>
              <h1>Movie Information for {this.state.movie}</h1>
              <h2 id="alreadyWatched">You already watched this</h2>
              {this.state.showThisMessage && (
                <h2>Create an account to add to your watch/watched lists</h2>
              )}
              <div id="signedIn">
                <div id="watch">
                  <Button id="addWatchList" onClick={this.addToWatchList}>
                    Add to Watch List
                  </Button>
                </div>

                <div id="watchedDiv">
                  <Button id="watched" onClick={this.addToWatchedList}>
                    I watched this movie
                  </Button>
                  <h3></h3>
                </div>
              </div>

              <Button
                color="primary"
                variant="outlined"
                onClick={this.showOverview}
              >
                {this.state.button1test}
              </Button>
              {this.state.showOverview && (
                <div id="information">
                  <table id="movieInfoTable">
                    <tbody>
                      <tr>
                        <td>Date Released</td>
                        <td>{this.state.dateReleased}</td>
                      </tr>
                      <tr>
                        <td>Overview</td>
                        <td>{this.state.overview}</td>
                      </tr>
                      <tr>
                        <td>General Rating</td>
                        <td>{this.state.rating} / 10</td>
                      </tr>
                      <tr>
                        <td>MovieSite Rating</td>
                        {this.state.ourRating === "no ratings yet" ? (
                          <td>this movie has not been user-rated yet</td>
                        ) : (
                          <td>
                            Our Rating :{" "}
                            {Math.round(10 * this.state.ourRating) / 10} / 5
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
                  onClick={this.showRatings}
                >
                  {this.state.button2test}
                </Button>
                {this.state.showRatings && (
                  <div>
                    {this.state.commentsAndRatings.length === 0 ? (
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
                          {this.state.commentsAndRatings.map((comment) => (
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
              {console.log(this.state.commentsAndRatings)}
            </div>
          </div>
          <Footer data={this.state.data} />
        </div>

        <ParticleBackground />
      </div>
    );
  }
}

export default MovieInfo;

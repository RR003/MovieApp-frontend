import React, { Component, useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../Rating.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { editWatchedList } from "../actions/data";

const Ratings = (props) => {
  const dispatch = useDispatch();
  const [rating, setRatings] = useState("");
  const [comment, setComments] = useState("");

  const handleSubmit = () => {
    dispatch(
      editWatchedList(props.user.username, props.movieId, rating, comment)
    );
    window.location.reload();
  };

  const setRating = (event) => {
    setRatings(event.target.value);
  };

  const setComment = (event) => {
    setComments(event.target.value);
  };

  return (
    <div id="totalForm">
      <form>
        <h2>{props.title}</h2>
        <label>Rating (0-5) : </label>
        <select id="selector" onChange={setRating}>
          <option value="none" selected disabled hidden>
            Select
          </option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <TextField
          id="the-comment"
          placeholder="Comments?"
          onChange={setComment}
        ></TextField>
      </form>
      <br></br>
      <Button id="ratingButton" onClick={handleSubmit}>
        Submit Rating
      </Button>
    </div>
  );
};

/* class Ratings extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    rating: null,
    comment: "",
  };
  handleSubmit = () => {
    console.log("Rating = " + this.state.rating);
    let url = process.env.REACT_APP_URL;
    setTimeout(
      axios.put(url + "/user/updateWatchedList", {
        username: this.props.user.username,
        movieId: this.props.movieId,
        rating: this.state.rating,
        comment: this.state.comment,
      }),
      1000
    );
    window.location.reload(false);
  };

  setRating = (event) => {
    this.setState({ rating: event.target.value });
  };

  setComment = (event) => {
    this.setState({ comment: event.target.value });
  };

  render() {
    return (
      <div id="totalForm">
        <form>
          <h2>{this.props.title}</h2>
          <label>Rating (0-5) : </label>
          <select id="selector" onChange={this.setRating}>
            <option value="none" selected disabled hidden>
              Select
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <TextField
            id="the-comment"
            placeholder="Comments?"
            onChange={this.setComment}
          ></TextField>
        </form>
        <br></br>
        <Button id="ratingButton" onClick={this.handleSubmit}>
          Submit Rating
        </Button>
      </div>
    );
  }
}*/

export default Ratings;

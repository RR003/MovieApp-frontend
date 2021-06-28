import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import "./SignUp.css";
import ParticleBackground from "../ParticleBackground";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const SignUp = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  let url = process.env.REACT_APP_URL;

  const handleOnSubmit = () => {
    if (firstName.length === 0) setMessage("First Name is null");
    else if (lastName.length === 0) setMessage("Last Name is null");
    else if (email.length === 0 || email.includes("@") === false)
      setMessage("Email is not valid");
    else if (username.length < 5)
      setMessage("Username must contains at least 5 characters");
    else if (password.length < 8)
      setMessage("Password must be at least 8 characters");
    else if (password !== confirmPassword) setMessage("Passwords do not match");
    else {
      axios({
        method: "post",
        url: url + "/user/signup",
        data: {
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
        },
      }).then((res) => {
        let response = res.data.url;
        if (response === "success") {
          props.history.push({
            pathname: "/verify",
            state: {
              username: username,
              firstName: firstName,
              lastName: lastName,
              password: password,
              email: email,
            },
          });
        } else if (response === "success2") {
          props.history.push({
            pathname: "/",
            state: {
              state: {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email,
              },
            },
          });
        } else setMessage(response);
      });
    }
  };

  const handleSignIn = () => {
    window.location.href = "/signIn";
  };

  {
    return (
      <div>
        <div id="all">
          <NavBar></NavBar>
          <center>
            <Container id="totalsigninform" component="main" maxWidth="xs">
              <CssBaseline />
              <div>
                <Typography id="signintitle" variant="h4">
                  Create An Account
                </Typography>
                <br></br>
                <form noValidate id="signinform">
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        id="firstName"
                        value={firstName}
                        label="Enter First Name"
                        name="first name"
                        onChange={handleFirstNameChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        id="lastName"
                        value={lastName}
                        label="Enter Last Name"
                        name="last name"
                        onChange={handleLastNameChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        id="email"
                        value={email}
                        type="email"
                        label="Enter Email"
                        name="email"
                        onChange={handleEmailChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        id="username"
                        value={username}
                        label="Enter Username"
                        name="username"
                        onChange={handleUsernameChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        id="password"
                        value={password}
                        label="Enter Password"
                        type="password"
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        id="confirmpassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        type="password"
                        onChange={handleConfirmPasswordChange}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                </form>
                <Button
                  // type="submit"
                  id="signinbutton"
                  variant="contained"
                  color="primary"
                  preventDefault
                  onClick={handleOnSubmit}
                >
                  Create Account
                </Button>
                <Button
                  // type="submit"
                  id="signupbutton"
                  variant="contained"
                  color="primary"
                  preventDefault
                  onClick={handleSignIn}
                >
                  Log In Instead
                </Button>
                <Typography style={{ margin: 7 }} variant="body1">
                  {message}
                </Typography>
              </div>
            </Container>
          </center>
        </div>
        <ParticleBackground />
      </div>
    );
  }
};

export default SignUp;

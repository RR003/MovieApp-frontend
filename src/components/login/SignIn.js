import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import "./SignIn.css";
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
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, signInWithGoogle } from "../../actions/auth";
import { useHistory } from "react-router-dom";
require("dotenv").config();

const clientId = process.env.REACT_APP_GOOGLE_API_KEY;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

let url = process.env.REACT_APP_URL;

const SignIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSuccess = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    dispatch(signInWithGoogle(id_token, history));
  };

  const onFailure = (res) => {};

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let formData = {
      username: username,
      password: password,
    };
    dispatch(signIn(formData, history)).then((res) =>
      res.length > 30 ? setMessage("valid") : setMessage(res)
    );
    // console.log(response);
    // let timeout = setTimeout(settingMessage("Login Unsuccessful"), 5000);

    /*axios
      .post(url + `/user/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        let body = res.data;

        if (body.url.length > 30) {
          let token = body.url;
          sessionStorage.setItem("token", token);
          // console.log(token);
          axios.get(url + `/user/${username}`).then((res) => {
            props.history.push({
              pathname: "/",
              state: res.data,
            });
          });
        } else {
          setMessage(body.url);
        }
      });*/
  };

  const handleSignUp = () => {
    window.location.href = "/signUp";
  };

  const forgotPassword = () => {
    window.location.href = "/forgotPassword";
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
                  Sign In
                </Typography>
                <br></br>
                <div class="form-with-button">
                  <form noValidate id="signinform">
                    <div></div>
                    <div class="actual-form">
                      <Grid>
                        <Grid item>
                          <TextField
                            variant="filled"
                            required
                            id="username"
                            value={username}
                            label="Enter Username"
                            name="username"
                            onChange={handleUsernameChange}
                            fullWidth
                          />
                        </Grid>
                        <br></br>
                        <Grid item>
                          <TextField
                            variant="filled"
                            required
                            id="password"
                            value={password}
                            label="Enter Password"
                            type="password"
                            onChange={handlePasswordChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </div>

                    <Typography style={{ margin: 7 }} variant="body1">
                      {message}
                    </Typography>

                    <div>
                      <div class="forgot-password">
                        <Link color="secondary" onClick={forgotPassword}>
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <Button
                      // type="submit"
                      id="signinbutton"
                      variant="contained"
                      color="primary"
                      preventDefault
                      onClick={handleOnSubmit}
                      fullWidth
                    >
                      Log In
                    </Button>

                    <GoogleLogin
                      class="google-sign"
                      clientId={clientId}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                    />
                  </form>
                </div>
              </div>

              <div class="sign-up-message">
                <p>Don't have an account?</p>
              </div>

              <Button
                // type="submit"
                id="signupbutton"
                variant="contained"
                color="primary"
                preventDefault
                onClick={handleSignUp}
                fullWidth
              >
                Sign Up
              </Button>
            </Container>
          </center>
        </div>
        <ParticleBackground />
      </div>
    );
  }
};

export default SignIn;

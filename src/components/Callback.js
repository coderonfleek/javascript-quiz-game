import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import _auth0 from "../services/Auth0Service";
import toastr from "toastr";
import request from "request";
import config from "../config";
import firebase from "../firebase";

class Callback extends Component {
  accessToken;
  componentDidMount() {
    _auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = "";
        // Store access token
        this.accessToken = authResult.accessToken;
        // Get user info: set up session, get Firebase token
        this.getUserInfo(authResult);
      } else if (err) {
        /* this.router.navigate(["/"]);
        this.loading = false; */
        console.error(`Error authenticating: ${err.error}`);
        toastr.error(`Error authenticating: ${err.error}`, "Error", {
          closeButton: true
        });
      }
    });
  }

  getUserInfo(authResult) {
    console.log(authResult);
    _auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        console.log(profile);
        this.beginPlayerSession(authResult);
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
        toastr.error(`Error retrieving profile: ${err.error}`, "Error", {
          closeButton: true
        });
      }
    });
  } //getUserInfo

  beginPlayerSession(authResult) {
    // Set tokens and expiration in localStorage
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + Date.now());
    localStorage.setItem("expires_at", expiresAt);

    // Get Firebase token
    this.getFirebaseToken();
    // Redirect to desired route

    this.props.history.push("/quiz");
  } //beginPlayerSession

  getFirebaseToken() {
    // Prompt for login if no access token

    if (!this.accessToken) {
      window.location.replace("/");
    }

    console.log(this.accessToken);

    var options = {
      method: "GET",
      url: `${config.firebaseTokenAPI}auth/firebase`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      },
      json: true
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      console.log(body);
      localStorage.setItem("firebase_token", body.firebaseToken);
      this.firebaseAuth(body);
    });
  } //getFirebaseToken

  firebaseAuth(tokenObj) {
    firebase
      .auth()
      .signInWithCustomToken(tokenObj.firebaseToken)
      .then(res => {
        console.log("Successfully authenticated with Firebase!");
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(
          `${errorCode} Could not log into Firebase: ${errorMessage}`
        );
      });
  } //firebaseAuth

  render() {
    return <div>Redirecting.....</div>;
  }
}

export default withRouter(Callback);

/* export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Callback)
); */

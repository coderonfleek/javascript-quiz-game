import React, { Component } from "react";
import _auth0 from "../services/Auth0Service";
import toastr from "toastr";

export default class Callback extends Component {
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
    window.location.replace("/quiz");
  } //beginPlayerSession

  getFirebaseToken() {
    // Prompt for login if no access token
    /* if (!this.accessToken) {
      window.location.replace("/");
    }
    const getToken$ = () => {
      return this.http.get(`${environment.apiRoot}auth/firebase`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${this.accessToken}`
        )
      });
    };
    this.firebaseSub = getToken$().subscribe(
      res => this._firebaseAuth(res),
      err =>
        console.error(
          `An error occurred fetching Firebase token: ${err.message}`
        )
    ); */
  } //getFirebaseToken

  render() {
    return <div>Redirecting.....</div>;
  }
}

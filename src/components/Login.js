import React, { Component } from "react";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

import config from "../config";
import _auth0 from "../services/Auth0Service";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {}

  login = e => {
    _auth0.authorize();
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="jumbotron">
              <h1 className="display-4">So You Think You Can Script</h1>
              <p className="lead" align="center">
                Test your Javascript knowledge by competing in the Javascript
                Championship by trying to beat the High Score
              </p>
              <hr className="my-4" />
              <div className="row justify-content-center">
                <button className="btn btn-primary btn-lg" onClick={this.login}>
                  Login To Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

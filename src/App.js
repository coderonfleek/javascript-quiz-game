import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import AddQuestion from "./components/AddQuestion";
import Callback from "./components/Callback";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container" id="appContainer">
          <div className="row">
            <Route exact path="/" component={Login} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/addquestion" component={AddQuestion} />
            <Route path="/callback" component={Callback} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

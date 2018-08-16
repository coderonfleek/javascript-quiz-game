import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import AddQuestion from "./components/AddQuestion";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
            <li>
              <Link to="/addquestion">Add Question</Link>
            </li>
          </ul>

          <Route exact path="/" component={Login} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/addquestion" component={AddQuestion} />
        </div>
      </Router>
    );
  }
}

export default App;

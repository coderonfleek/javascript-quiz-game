import React, { Component } from "react";

export default class Quiz extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                Question 13{" "}
                <span className="float-right">
                  Current Score <span class="badge badge-warning">365</span>
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  What is the difference between let and const?
                </h5>
                <div>
                  <ul>
                    <li>
                      <input type="radio" /> They are same
                    </li>
                    <li>
                      <input type="radio" /> One is fine the other is stupid
                    </li>
                  </ul>
                </div>
                <div className="row">&nbsp;</div>
                <a href="#" className="btn btn-primary">
                  Submit Answer
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">High Scores</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Cras justo odio{" "}
                  <span class="badge badge-success float-right">9</span>
                </li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

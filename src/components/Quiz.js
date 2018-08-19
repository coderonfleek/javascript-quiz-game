import React, { Component } from "react";
import toastr from "toastr";

import questions from "../data/questions";
import config from "../config";

export default class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      totalScore: 0,
      questionIndex: 0,
      currentQuestion: questions[0],
      selectedAnswer: null,
      gameOver: false
    };
  }

  setAnswer = e => {
    this.setState({
      selectedAnswer: e.target.value
    });
  };

  submitAnswer = e => {
    if (this.state.selectedAnswer) {
      if (this.state.selectedAnswer === this.state.currentQuestion.answer) {
        //alert("Correct answer");

        toastr.success("Correct Answer", "Great", {
          closeButton: true
        });

        var nextQuestionIndex = this.state.questionIndex + 1;

        //check if all questions are exhausted
        if (nextQuestionIndex < questions.length) {
          //Set score and continue game
          this.setState({
            totalScore: this.state.totalScore + config.pointsPerQuestion,
            questionIndex: nextQuestionIndex,
            currentQuestion: questions[nextQuestionIndex],
            selectedAnswer: null
          });
        } else {
          //Set score and end game
          let finalScore = this.state.totalScore + config.pointsPerQuestion;
          this.setState({
            totalScore: finalScore,
            gameOver: true
          });
          toastr.info(
            `Game Ended. Your Total Score is ${finalScore}`,
            "Awesome",
            {
              closeButton: true
            }
          );
        }
      } else {
        //End game
        this.setState({
          gameOver: true
        });
        toastr.error(
          `Game Over. Total Score ${this.state.totalScore}`,
          "Wrong Answer",
          {
            closeButton: true
          }
        );
      }
    } else {
      toastr.error(`No answer selected`, "Error", {
        closeButton: true
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                Question {this.state.currentQuestion.order}
                <span className="float-right">
                  Current Score
                  <span className="badge badge-warning">
                    {this.state.totalScore}
                  </span>
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {this.state.currentQuestion.question}
                </h5>
                <div>
                  <ul>
                    {this.state.currentQuestion.options.map(option => (
                      <li key={option.name}>
                        <input
                          type="radio"
                          name="answer"
                          value={option.name}
                          onChange={this.setAnswer}
                          checked={this.state.selectedAnswer === option.name}
                        />{" "}
                        {option.name}. {option.body}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="row">&nbsp;</div>
                <button
                  className="btn btn-primary"
                  onClick={this.submitAnswer}
                  disabled={this.state.gameOver}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">High Scores</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Cras justo odio{" "}
                  <span className="badge badge-success float-right">9</span>
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

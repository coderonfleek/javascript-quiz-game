import React, { Component } from "react";
import toastr from "toastr";

import questions from "../data/questions";
import config from "../config";
import { firestore } from "../firebase";
import { withRouter } from "react-router-dom";

class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      userProfile: JSON.parse(localStorage.getItem("quiz_player_profile")),
      highScores: null,
      totalScore: 0,
      questionIndex: 0,
      currentQuestion: questions[0],
      selectedAnswer: null,
      gameOver: false
    };
    console.log(this.state.userProfile);
  }

  componentDidMount() {
    if (!this.state.userProfile) {
      this.props.history.push("/");
    }

    firestore.settings({
      timestampsInSnapshots: true
    });
    //Fetch High Scores with realtime updates

    firestore
      .collection(config.scoresCollection)
      .orderBy("score", "desc")
      .limit(5)
      .onSnapshot(querySnapshot => {
        var scores = [];
        querySnapshot.forEach(function(doc) {
          scores.push(doc.data());
        });

        console.log(scores);
        this.setState({ highScores: scores });
      });
  } //componentDidMount

  setAnswer = e => {
    this.setState({
      selectedAnswer: e.target.value
    });
  }; //setAnswer

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
          this.saveScore(finalScore).then(() => {
            toastr.info(
              `Game Ended. Your Total Score is ${finalScore}`,
              "Awesome",
              {
                closeButton: true
              }
            );
          });
        }
      } else {
        //End game
        this.setState({
          gameOver: true
        });

        this.saveScore(this.state.totalScore).then(() => {
          toastr.error(
            `Game Over. Total Score ${this.state.totalScore}`,
            "Wrong Answer",
            {
              closeButton: true
            }
          );
        });
      }
    } else {
      toastr.error(`No answer selected`, "Error", {
        closeButton: true
      });
    }
  }; //submitAnswer

  saveScore(score) {
    return firestore.collection(config.scoresCollection).add({
      name: this.state.userProfile.name,
      email: this.state.userProfile.email,
      score: score
    });
  } //saveScore

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
                {this.state.highScores
                  ? this.state.highScores.map(scoreObj => {
                      return (
                        <li key={scoreObj.email} className="list-group-item">
                          {scoreObj.name}
                          <span className="badge badge-success float-right">
                            {scoreObj.score}
                          </span>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Quiz);

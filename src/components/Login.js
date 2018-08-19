import React, { Component } from "react";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    firestore.settings({
      timestampsInSnapshots: true
    });

    /* firestore
      .collection("questions")
      .add({
        id: 2,
        question: "How old are you"
      })
      .then(docRef => {})
      .catch(err => {}); */

    firestore
      .collection("questions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data());
        });
      });
  }
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
                <Link className="btn btn-primary btn-lg" to="/quiz">
                  Login To Play
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

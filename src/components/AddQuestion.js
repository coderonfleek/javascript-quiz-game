import React, { Component } from "react";

export default class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {};
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={this.updateInput}
            className="form-control"
            value={this.state.fullname}
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Full name"
            onChange={this.updateInput}
            value={this.state.email}
          />
        </form>
      </div>
    );
  }
}

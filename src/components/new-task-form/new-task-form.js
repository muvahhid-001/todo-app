import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = { text: "" };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.trim()) {
      this.props.addTask(this.state.text);
      this.setState({ text: "" });
    }
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.text}
          onChange={this.onChange}
        />
      </form>
    );
  }
}

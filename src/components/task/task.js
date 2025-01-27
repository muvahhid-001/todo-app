import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  state = {
    done: false,
  };

  liClick = () => {
    this.setState((state) => {
      return {
        done: !state.done,
      };
    });
  };

  render() {
    const { text, status, creationTime } = this.props;

    let className = status;

    if (this.state.done) {
      className = "completed";
    }

    return (
      <li className={className ? className : null}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.liClick}>
              {text}
            </span>
            <span className="created">{creationTime}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={this.props.deleteTask}
          ></button>
        </div>
        {status === "editing" && (
          <input type="text" className="edit" defaultValue="Editing task" />
        )}
      </li>
    );
  }
}

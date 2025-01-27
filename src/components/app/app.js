import React, { Component } from "react";

import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import TaskList from "../task-list/task-list";

import "./app.css";

export default class App extends Component {
  state = {
    data: [
      {
        id: 1,
        text: "Атжумания",
        status: "active",
        important: false,
        creationTime: "created 17 seconds ago",
      },
      {
        id: 2,
        text: "Предсидания",
        status: "active",
        important: false,
        creationTime: "created 45 seconds ago",
      },
    ],
  };

  deleteLi = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newArray = [...data.slice(0, idx), ...data.slice(idx + 1)];
      return { data: newArray };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList tasks={this.state.data} deleteTask={this.deleteLi} />
        </section>
        <Footer />
      </section>
    );
  }
}

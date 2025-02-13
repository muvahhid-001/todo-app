import React, { Component } from 'react';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list/task-list';
import './app.css';

export default class App extends Component {
  state = {
    data: [
      {
        id: -1,
        text: 'Атжумания 100',
        status: 'active',
        important: false,
        done: false,
        creationTime: new Date(2025, 1, 3),
      },
    ],
    nextId: 3,
    filter: 'all',
  };

  createTodoItem(text, id) {
    return {
      id,
      text,
      status: 'active',
      important: false,
      done: false,
      creationTime: new Date(),
    };
  }

  addTask = (text) => {
    this.setState(({ data, nextId }) => ({
      data: [...data, this.createTodoItem(text, nextId)],
      nextId: nextId + 1,
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ data }) => ({
      data: data.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    }));
  };

  deleteLi = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((task) => task.id !== id),
    }));
  };

  clearCompleted = () => {
    this.setState(({ data }) => ({
      data: data.filter((task) => !task.done),
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredTasks() {
    const { data, filter } = this.state;
    switch (filter) {
      case 'active':
        return data.filter((task) => !task.done);
      case 'completed':
        return data.filter((task) => task.done);
      default:
        return data;
    }
  }

  getActiveTasksCount() {
    return this.state.data.filter((task) => !task.done).length;
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList tasks={this.getFilteredTasks()} deleteTask={this.deleteLi} onToggleDone={this.onToggleDone} />
        </section>
        <Footer
          setFilter={this.setFilter}
          filter={this.state.filter}
          activeTasksCount={this.getActiveTasksCount()}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

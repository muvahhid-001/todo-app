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
        min: 0,
        sec: 30,
        creationTime: new Date(2025, 1, 3),
        buttonStatus: false,
      },
    ],
    nextId: 3,
    filter: 'all',
  };

  createTodoItem(text, id, min, sec) {
    return {
      id,
      text,
      status: 'active',
      important: false,
      min,
      sec,
      done: false,
      buttonStatus: false,
      creationTime: new Date(),
    };
  }

  addTask = (text, min, sec) => {
    this.setState(({ data, nextId }) => ({
      data: [...data, this.createTodoItem(text, nextId, min, sec)],
      nextId: nextId + 1,
    }));
  };

  updateTask = (id, newText, min, sec, buttonStatus) => {
    this.setState(({ data }) => ({
      data: data.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              min,
              sec,
              buttonStatus,
              status: task.status === 'editing' ? 'active' : task.status,
            }
          : task
      ),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ data }) => ({
      data: data.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    }));
  };

  editLi = (id) => {
    this.setState(({ data }) => ({
      data: data.map((task) => (task.id === id ? { ...task, status: 'editing' } : task)),
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
    const { data, filter } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={data}
            filter={filter}
            deleteTask={this.deleteLi}
            editTask={this.editLi}
            onToggleDone={this.onToggleDone}
            updateTask={this.updateTask}
          />
        </section>
        <Footer
          setFilter={this.setFilter}
          filter={filter}
          activeTasksCount={this.getActiveTasksCount()}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

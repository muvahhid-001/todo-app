import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  state = {
    text: '',
    min: '',
    sec: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.trim()) {
      this.props.addTask(this.state.text, Number(this.state.min), Number(this.state.sec));
      this.setState({ text: '', min: '', sec: '' });
    }
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onChangeMin = (e) => {
    this.setState({ min: e.target.value });
  };

  onChangeSec = (e) => {
    this.setState({ sec: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="Task" autoFocus value={this.state.text} onChange={this.onChange} />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          value={this.state.min}
          onChange={this.onChangeMin}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          value={this.state.sec}
          onChange={this.onChangeSec}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    );
  }
}

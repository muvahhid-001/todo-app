import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: props.min,
      seconds: props.sec,
      isRunning: false,
      editingText: props.text,
    };
    this.timerId = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.min !== this.props.min || prevProps.sec !== this.props.sec) {
      this.setState({ minutes: this.props.min, seconds: this.props.sec });
    }

    if (prevProps.status !== 'editing' && this.props.status === 'editing') {
      this.setState({ editingText: this.props.text });
    }

    // Если задача стала выполненной, останавливаем таймер
    if (!prevProps.done && this.props.done) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerId = setInterval(this.tick, 1000);
    }
  };

  pauseTimer = () => {
    this.setState({ isRunning: false });
    clearInterval(this.timerId);
  };

  stopTimer = () => {
    this.setState({ isRunning: false });
    clearInterval(this.timerId);
  };

  tick = () => {
    const { minutes, seconds } = this.state;
    if (minutes === 0 && seconds === 0) {
      this.stopTimer();
      return;
    }
    if (seconds === 0) {
      this.setState({ minutes: minutes - 1, seconds: 59 });
    } else {
      this.setState({ seconds: seconds - 1 });
    }
  };

  handleTimerClick = () => {
    if (this.props.done) {
      return;
    }
    if (this.state.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  };

  handleEditChange = (e) => {
    this.setState({ editingText: e.target.value });
  };

  handleEditSubmit = (e) => {
    if (e.key === 'Enter') {
      const { id, updateTask, min, sec } = this.props;
      const { editingText } = this.state;
      updateTask(id, editingText, min, sec, false);
    }
  };

  render() {
    const {
      status = '',
      creationTime = '',
      onToggleDone = () => {},
      deleteTask = () => {},
      editTask = () => {},
      done = false,
      style, // получаем стиль из пропсов
    } = this.props;

    const { minutes, seconds, isRunning, editingText } = this.state;

    let className = status;
    if (done) {
      className = 'completed';
    }

    return (
      <li className={className || null} style={style}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone}>
              {this.props.text}
            </span>
            <button
              className={`button_tg ${isRunning ? 'pause' : 'play'}`}
              onClick={this.handleTimerClick}
              disabled={done}
            ></button>
            <span className="description">
              <p className="timer">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
            </span>
            <span className="created">Created {formatDistanceToNow(creationTime, { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
        </div>
        {status === 'editing' && (
          <input
            type="text"
            className="edit"
            value={editingText}
            onChange={this.handleEditChange}
            onKeyDown={this.handleEditSubmit}
          />
        )}
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string,
  status: PropTypes.string,
  creationTime: PropTypes.instanceOf(Date),
  onToggleDone: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  updateTask: PropTypes.func,
  done: PropTypes.bool,
  min: PropTypes.number,
  sec: PropTypes.number,
  style: PropTypes.object,
};

export default Task;

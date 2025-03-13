import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

const Task = ({ id, text, status, min, sec, done, creationTime, onToggleDone, deleteTask, editTask, updateTask }) => {
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(sec);
  const [isRunning, setIsRunning] = useState(false);
  const [editingText, setEditingText] = useState(text);
  const [buttonStatus, setButtonStatus] = useState(false);

  const minutesRef = useRef(minutes);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    minutesRef.current = minutes;
    secondsRef.current = seconds;
  }, [minutes, seconds]);

  useEffect(() => {
    if (done) {
      setIsRunning(false);
    }
  }, [done]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setIsRunning(false);
      setButtonStatus(true);
    }
  }, [minutes, seconds]);

  const tick = () => {
    if (minutesRef.current === 0 && secondsRef.current === 0) {
      setIsRunning(false);
      return;
    }

    if (secondsRef.current === 0) {
      setMinutes((prev) => prev - 1);
      setSeconds(59);
    } else {
      setSeconds((prev) => prev - 1);
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setButtonStatus(false);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const handleTimerClick = () => {
    if (done) {
      return;
    }
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    if (e.key === 'Enter') {
      updateTask(id, editingText, minutes, seconds, buttonStatus);
    }
  };

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(tick, 1000);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  let className = status;
  if (done) {
    className = 'completed';
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
        <label>
          <span className="description title_task" onClick={onToggleDone}>
            {text}
          </span>
          <button
            className={`button_tg ${isRunning ? 'pause' : 'play'}`}
            onClick={handleTimerClick}
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
          onChange={handleEditChange}
          onKeyDown={handleEditSubmit}
        />
      )}
    </li>
  );
};

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
};

export default Task;

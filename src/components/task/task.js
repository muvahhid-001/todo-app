import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

const Task = ({
  id,
  text = '',
  status = '',
  creationTime = '',
  onToggleDone = () => {},
  deleteTask = () => {},
  editTask = () => {},
  updateTask = () => {},
  done = false,
}) => {
  const [inputValue, setInputValue] = useState(text);

  // При входе в режим редактирования устанавливаем начальное значение
  useEffect(() => {
    if (status === 'editing') {
      setInputValue(text);
    }
  }, [status, text]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Вызываем updateTask для сохранения изменений
      updateTask(inputValue);
    }
  };

  let className = status;
  if (done) {
    className = 'completed';
  }

  return (
    <li className={className || null}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
        <label>
          <span className="description" onClick={onToggleDone}>
            {text}
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
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
};

export default Task;

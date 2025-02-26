import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

const TaskList = ({
  tasks = [],
  filter = 'all',
  deleteTask = () => {},
  onToggleDone = () => {},
  editTask = () => {},
  updateTask = () => {},
}) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        const isVisible =
          filter === 'all' || (filter === 'active' && !task.done) || (filter === 'completed' && task.done);

        return (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            status={task.status}
            creationTime={task.creationTime}
            done={task.done}
            min={task.min}
            sec={task.sec}
            deleteTask={() => deleteTask(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
            editTask={() => editTask(task.id)}
            updateTask={(newText, min, sec, buttonStatus) => updateTask(task.id, newText, min, sec, buttonStatus)}
            style={{ display: isVisible ? 'block' : 'none' }}
          />
        );
      })}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      text: PropTypes.string,
      status: PropTypes.string,
      creationTime: PropTypes.instanceOf(Date),
      done: PropTypes.bool,
    })
  ),
  filter: PropTypes.string,
  deleteTask: PropTypes.func,
  onToggleDone: PropTypes.func,
  editTask: PropTypes.func,
  updateTask: PropTypes.func,
};

export default TaskList;

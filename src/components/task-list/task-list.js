import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

const TaskList = ({
  tasks = [],
  deleteTask = () => {},
  onToggleDone = () => {},
  editTask = () => {},
  updateTask = () => {},
}) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          status={task.status}
          creationTime={task.creationTime}
          done={task.done}
          deleteTask={() => deleteTask(task.id)}
          onToggleDone={() => onToggleDone(task.id)}
          editTask={() => editTask(task.id)}
          updateTask={(newText) => updateTask(task.id, newText)}
        />
      ))}
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
  deleteTask: PropTypes.func,
  onToggleDone: PropTypes.func,
  edit: PropTypes.func,
};

export default TaskList;

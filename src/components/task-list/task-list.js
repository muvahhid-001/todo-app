import React from "react";
import PropTypes from "prop-types";
import Task from "../task/task";
import "./task-list.css";

const TaskList = ({ tasks, deleteTask, onToggleDone }) => {
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
        />
      ))}
    </ul>
  );
};

TaskList.defaultProps = {
  tasks: [],
  deleteTask: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      text: PropTypes.string,
      status: PropTypes.string,
      creationTime: PropTypes.string,
      done: PropTypes.bool,
    })
  ),
  deleteTask: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;

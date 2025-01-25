import React from "react";

import Task from "../task/task";

import "./task-list.css";

const TaskList = ({ tasks }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          status={task.status}
          creationTime={task.creationTime}
        />
      ))}
    </ul>
  );
};

export default TaskList;

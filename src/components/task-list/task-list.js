import React from "react";

import Task from "../task/task";

import "./task-list.css";

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          status={task.status}
          creationTime={task.creationTime}
          deleteTask={() => {
            deleteTask(task.id);
          }}
        />
      ))}
    </ul>
  );
};

export default TaskList;

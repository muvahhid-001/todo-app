import React from "react";
import "./task.css";

const Task = ({
  text,
  status,
  creationTime,
  onToggleDone,
  deleteTask,
  done,
}) => {
  let className = status;
  if (done) {
    className = "completed";
  }

  return (
    <li className={className ? className : null}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label>
          <span className="description" onClick={onToggleDone}>
            {text}
          </span>
          <span className="created">{creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={deleteTask}></button>
      </div>
      {status === "editing" && (
        <input type="text" className="edit" defaultValue="Editing task" />
      )}
    </li>
  );
};

export default Task;

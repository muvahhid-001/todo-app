import React from "react";

import "./task.css";

const Task = ({ text, status, creationTime }) => {
  return (
    <li className={status ? status : null}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{text}</span>
          <span className="created">{creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {status === "editing" && (
        <input type="text" className="edit" defaultValue="Editing task" />
      )}
    </li>
  );
};

export default Task;

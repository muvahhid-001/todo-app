import React from "react";
import TaskFilter from "../task-filter";
import "./footer.css";

const Footer = ({ setFilter, filter, activeTasksCount, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} {activeTasksCount === 1 ? "item" : "items"} left
      </span>
      <TaskFilter setFilter={setFilter} activeFilter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

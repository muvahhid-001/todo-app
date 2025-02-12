import React from "react";
import PropTypes from "prop-types";
import "./task-filter.css";

const TaskFilter = ({ setFilter = () => {}, activeFilter = 'active' }) => {
  return (
    <ul className="filters">
      <li>
        <button
          className={activeFilter === "all" ? "selected" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={activeFilter === "active" ? "selected" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={activeFilter === "completed" ? "selected" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.propTypes = {
  setFilter: PropTypes.func,
  activeFilter: PropTypes.string,
};

export default TaskFilter;

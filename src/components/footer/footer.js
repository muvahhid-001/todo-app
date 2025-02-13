import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../task-filter';
import './footer.css';

const Footer = ({ setFilter = () => {}, filter = 'all', activeTasksCount = 0, clearCompleted = () => {} }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} {activeTasksCount === 1 ? 'item' : 'items'} left
      </span>
      <TaskFilter setFilter={setFilter} activeFilter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.string,
  activeTasksCount: PropTypes.number,
  clearCompleted: PropTypes.func,
};

export default Footer;

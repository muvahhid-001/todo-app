import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm = ({ addTask = () => {} }) => {
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, Number(min), Number(sec));
      setText('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input className="new-todo" placeholder="Task" autoFocus value={text} onChange={(e) => setText(e.target.value)} />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        value={sec}
        onChange={(e) => setSec(e.target.value)}
      />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  );
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;

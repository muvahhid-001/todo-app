import React, { useState } from 'react';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list/task-list';
import './app.css';

const App = () => {
  const [data, setData] = useState([
    {
      id: -1,
      text: 'Атжумания 100',
      status: 'active',
      important: false,
      done: false,
      min: 0,
      sec: 30,
      creationTime: new Date(2025, 1, 3),
      buttonStatus: false,
    },
  ]);
  const [nextId, setNextId] = useState(3);
  const [filter, setFilter] = useState('all');

  const createTodoItem = (text, id, min, sec) => ({
    id,
    text,
    status: 'active',
    important: false,
    min,
    sec,
    done: false,
    buttonStatus: false,
    creationTime: new Date(),
  });

  const addTask = (text, min, sec) => {
    const newItem = createTodoItem(text, nextId, min, sec);
    setData((prevData) => [...prevData, newItem]);
    setNextId((prevNextId) => prevNextId + 1);
  };

  const updateTask = (id, newText, min, sec, buttonStatus) => {
    setData((prevData) =>
      prevData.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              min,
              sec,
              buttonStatus,
              status: task.status === 'editing' ? 'active' : task.status,
            }
          : task
      )
    );
  };

  const onToggleDone = (id) => {
    setData((prevData) => prevData.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const editLi = (id) => {
    setData((prevData) => prevData.map((task) => (task.id === id ? { ...task, status: 'editing' } : task)));
  };

  const deleteLi = (id) => {
    setData((prevData) => prevData.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setData((prevData) => prevData.filter((task) => !task.done));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return data.filter((task) => !task.done);
      case 'completed':
        return data.filter((task) => task.done);
      default:
        return data;
    }
  };

  const getActiveTasksCount = () => data.filter((task) => !task.done).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={getFilteredTasks()}
          deleteTask={deleteLi}
          editTask={editLi}
          onToggleDone={onToggleDone}
          updateTask={updateTask}
        />
      </section>
      <Footer
        setFilter={setFilter}
        filter={filter}
        activeTasksCount={getActiveTasksCount()}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};

export default App;

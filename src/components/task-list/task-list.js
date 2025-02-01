import React from "react";
import Task from "../task/task"; // Импортируем компонент Task
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
          done={task.done} // Передаем флаг done в Task
          deleteTask={() => deleteTask(task.id)} // передаем функцию для удаления
          onToggleDone={() => onToggleDone(task.id)} // передаем функцию для переключения done
        />
      ))}
    </ul>
  );
};

export default TaskList;

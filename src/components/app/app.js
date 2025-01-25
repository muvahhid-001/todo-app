import React from "react";

import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import TaskList from "../task-list/task-list";

import "./app.css";

const App = () => {
  const data = [
    {
      id: 1,
      text: "Completed task",
      status: "completed",
      creationTime: "created 17 seconds ago",
    },
    {
      id: 2,
      text: "Editing task",
      status: "editing",
      creationTime: "created 5 minutes ago",
    },
    {
      id: 3,
      text: "Active task",
      status: "",
      creationTime: "created 5 minutes ago",
    },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={data} />
      </section>
      <Footer />
    </section>
  );
};

export default App;

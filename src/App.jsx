import React, { useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import "./App.css";
function App() {
  const [taskList, setTaskList] = useState([]);
  const [updatedTask, setUpdatedTask] = useState({ id: null, name: "" });
  return (
    <div className="App">
      <Header />
      <AddTask
        taskList={taskList}
        setTaskList={setTaskList}
        updatedTask={updatedTask}
        setUpdatedTask={setUpdatedTask}
      />
      <ShowTask
        taskList={taskList}
        setTaskList={setTaskList}
        updatedTask={updatedTask}
        setUpdatedTask={setUpdatedTask}
      />
    </div>
  );
}

export default App;

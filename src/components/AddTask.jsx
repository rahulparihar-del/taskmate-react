import axios from "axios";
import React, { useState } from "react";

function AddTask({ taskList, setTaskList, updatedTask, setUpdatedTask }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();

    //If input field is empty data should not added in task list 
    if (!updatedTask.name.trim()) {
      return;
    }
    

    if (updatedTask.id) {
      try {
        // Use PATCH instead of DELETE for updating existing task
        const response = await axios.patch(`http://localhost:3000/lists/${updatedTask.id}`, {
          name: updatedTask.name,
          time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        });

        // Update the taskList state with the updated task
        const updatedTaskList = taskList.map((task) =>
          task.id === updatedTask.id ? response.data : task
        );

        setTaskList(updatedTaskList);
        setUpdatedTask({ id: null, name: '' });
      } catch (error) {
        console.error('Error updating task:', error.message);
      }

     
    } else {
      try {
        // Use POST for adding a new task
        const response = await axios.post("http://localhost:3000/lists", {
          id: Math.floor(Math.random() * 10000),
          name: updatedTask.name,
          time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        });

        // Add the new task to the taskList state
        const newTask = response.data;
        setTaskList([...taskList, newTask]);
        setUpdatedTask({ id: null, name: '' });
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          autoComplete="off"
          placeholder="Add Task "
          maxLength={25}
          value={updatedTask.name}
          onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
        />
        <button className="submit">{updatedTask.id ? "Update" : "Add"}</button>
      </form>
    </section>
  );
}

export default AddTask;

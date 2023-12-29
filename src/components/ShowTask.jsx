import axios from "axios";
import React, { useEffect, useState } from "react";

function ShowTask({taskList, setTaskList, updatedTask, setUpdatedTask}) {

  const [show, setShow] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/lists");
        setTaskList(response.data);
      } catch (error) {
        console.log("There is something wrong with the API", error);
      }
    };

    if(show){
      fetchData()
    }
    else{
      setTaskList([]);
    }
    
  }, [show]);


  const handleDelete = async (taskId)=>{
   
     try {
      await axios.delete(`http://localhost:3000/lists/${taskId}`)

       // Filter out the deleted task from the taskList
      const updateTaskList = taskList.filter((task) => task.id !== taskId);
        setTaskList(updateTaskList)
     } catch (error) {
      console.error('Error deleting task:', error.message);
     }
  }
  

  const handleUpdate = async (taskId) =>{
    const seletedTask = taskList.find(todo => todo.id === taskId);
    setUpdatedTask(seletedTask);
  }


 
  return (
    <section className="showTask">

      {/* Header */}
      <div className="head">
        <div>
          <span className="title">Todo</span>
          <span className="count">{taskList.length}</span>
        </div>


        {/* Show and hide Task */}
        <button
          className="clearAll"
          style={{ margin: "10px" }}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
        <button className="clearAll" onClick={()=> setTaskList([])}>Clear All</button>
      </div>


      {/* TaskList and Icons: update and delete */}
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            <p>
              <span className="name">{task.name}</span>
              <span className="time">{task.time}</span>
            </p>
            <i className="bi bi-pencil-square" onClick={() => handleUpdate(task.id)} ></i>
            <i className="bi bi-trash" onClick={()=> handleDelete(task.id)}></i>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ShowTask;

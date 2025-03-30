import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
// import TaskGrid from "../components/TaskGrid";
import Navbar from "./Navbar";
import AllTaskGrid from "./AllTaskGrid";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-100 p-6 ml-[25%]">
        <div className="mb-6">
          <AddTaskForm addTask={addTask} />
        </div>
        <div><AllTaskGrid/></div>
      </div>
    </div>
  );
};

export default AllTask;
import React, { useState } from "react";
// import AddTaskForm from "./AddTaskForm";
// import TaskGrid from "./TaskGrid";
import Navbar from "./Navbar";
import DonutChart from "./DonutChart";
import TaskStats from "./TaskStats";

const Home = () => {
  const [tasks] = useState([
    { id: 1, title: "Task 1", status: "completed" },
    { id: 2, title: "Task 2", status: "in-progress" },
    { id: 3, title: "Task 3", status: "todo" },
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length;
  const todos = tasks.filter((task) => task.status === "todo").length;

  return (
    <div className="flex h-screen">
      {/* Navbar Section */}
      <Navbar />

      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100 mt-12 p-6 ml-[25%]">
        <div className="flex flex-col gap-6 h-full">
          {/* TaskStats Section */}
          <div className="flex-1 bg-white shadow rounded-lg p-4">
            <TaskStats
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              inProgressTasks={inProgressTasks}
              todos={todos}
            />
          </div>

          {/* DonutChart Section */}
          <div className="flex-1 bg-white shadow rounded-lg flex items-center justify-center">
            <DonutChart tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
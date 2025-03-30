import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskStats = ({ totalTasks, completedTasks, inProgressTasks }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);



  const stats = [
    {
      title: "TOTAL TASK",
      count: totalTasks,
      lastMonth: 20,
      bgColor: "bg-blue-500",
      icon: "📋",
    },
    {
      title: "COMPLETED TASK",
      count: completedTasks,
      lastMonth: 15,
      bgColor: "bg-green-500",
      icon: "✅",
    },
    {
      title: "TASK IN PROGRESS",
      count: inProgressTasks,
      lastMonth: 10,
      bgColor: "bg-yellow-500",
      icon: "🔄",
    },
    {
      title: "TODOS",
      count: todos.length, 
      lastMonth: 7,
      bgColor: "bg-pink-500",
      icon: "📌",
    },
  ];

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <h2 className="text-2xl font-bold">{stat.count}</h2>
            <p className="text-gray-400 text-sm">{stat.lastMonth} last month</p>
          </div>
          <div
            className={`w-12 h-12 flex items-center justify-center text-white text-xl rounded-full ${stat.bgColor}`}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
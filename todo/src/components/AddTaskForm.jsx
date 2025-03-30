import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllTask from './AllTask';

const AddTaskForm = () => {
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false); 
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    priority: "Low Priority",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing from localStorage");
      return; 
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/todo",
        formData, 
        {
          headers: {
            token, 
          },
        }
      );

      console.log("Task added successfully:", response.data);
location.reload();
     
      setShowForm(false); 
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
      >
        + Create Task
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={submitHandler}
            className="bg-white p-6 rounded-lg shadow-lg space-y-4"
          >
            <h2 className="text-xl font-bold">Create a New Task</h2>

            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Due Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium">
                Priority
              </label>
              <select
                name="priority"
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Low Priority">Low Priority</option>
                <option value="High Priority">High Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Task Description (Optional)
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter task details..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)} 
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Task
              </button>
            </div>
          </form>


        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
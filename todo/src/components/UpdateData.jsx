import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 

const UpdateData = () => {
  const navigate = useNavigate(); 
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    done: "Not Completed",
    priority: "Low Priority",
    description: "",
  });
console.log(formData);
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, please log in");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/todo/${id}`, {
          headers: { token }, 
        });
        setFormData(response.data); 
      } catch (error) {
        console.error("Error fetching the task data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler to update task
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing, unable to update task.");
      return; 
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/todo/${id}`, 
        formData, 
        {
          headers: { token }, 
        }
      );
      console.log("Task updated successfully:", response.data);

      navigate("/alltasks");
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <h2 className="text-xl font-bold">Update Task</h2>

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
            <label htmlFor="done" className="block text-sm font-medium">
              Completed
            </label>
            <select
              name="done"
              id="done"
              value={formData.done}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
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
              onClick={() => navigate("/alltasks")} 
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
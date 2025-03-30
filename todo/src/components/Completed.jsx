import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Completed = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get('http://localhost:3000/todos/Completed', {
        headers: {
          token,
        },
      })
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch tasks');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/todo/${id}`, {
        headers: {
          token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left-side Navbar */}
      <div className="w-1/4 bg-gray-900 text-white h-full">
        <Navbar />
      </div>

      {/* Right-side Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h1 className="text-4xl font-bold flex items-center justify-center mb-4">
            Tasks You've Completed
            <FaCheckCircle className="ml-2 text-green-500" />
          </h1>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-start p-4 bg-gray-100 rounded-md shadow-sm"
              >
                {/* Task Title and Description */}
                <div>
                  <span
                    className={`${
                      todo.completed ? 'line-through text-gray-500' : 'text-black'
                    } text-lg font-medium`}
                  >
                    {todo.title}
                  </span>
                  <p className="mt-2 text-gray-700">{todo.description}</p>
                </div>

                {/* Right-side Priority and Icons */}
                <div className="flex flex-col space-y-4 items-end">
                  <div
                    className={`${
                      todo.priority === 'High'
                        ? 'text-red-500'
                        : todo.priority === 'Low'
                        ? 'text-yellow-500'
                        : 'text-blue-500'
                    } text-sm font-semibold mb-2`}
                  >
                    Priority: {todo.priority}
                  </div>
                  <div className="flex space-x-6">
                    <button
                      onClick={() => navigate(`/todo/update/${todo._id}`)}
                      className="text-gray-500 hover:text-yellow-500"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-gray-500 hover:text-red-500"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Completed;
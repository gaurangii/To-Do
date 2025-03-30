import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Navbar from './Navbar';

const NotCompleted = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get('http://localhost:3000/todos/notCompleted', {
        headers: {
          token,
        },
      })
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((err) => {
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
          <h1 className="text-2xl font-semibold text-center mb-4">Tasks You've Not Completed ❌</h1>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-start p-4 bg-gray-100 rounded-md shadow-sm"
              >
                {/* Task Title and Description */}
                <div>
                  <h2
                    className={`${
                      todo.completed ? 'line-through text-gray-500' : 'text-black'
                    } text-lg font-medium`}
                  >
                    {todo.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">{todo.description}</p>
                </div>

                {/* Right-side Priority and Icons */}
                <div className="flex flex-col space-y-4 items-end">
                  <span
                    className={`${
                      todo.priority === 'High'
                        ? 'text-red-500'
                        : todo.priority === 'Low'
                        ? 'text-blue-500'
                        : 'text-yellow-500'
                    } text-sm font-semibold mb-2`}
                  >
                    Priority: {todo.priority}
                  </span>

                  {/* Actions */}
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
                      <FaTrashAlt size={16} />
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

export default NotCompleted;
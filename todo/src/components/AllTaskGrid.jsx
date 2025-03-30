import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaClipboard} from 'react-icons/fa'; 

const AllTaskGrid = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get('http://localhost:3000/todos', {
        headers: { token },
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
        headers: { token },
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
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-4xl font-bold flex items-center justify-center mb-4">
       All Of The Tasks
        <FaClipboard className="ml-2 text-gray-500" /></h1>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex flex-col md:flex-row justify-between items-start p-4 bg-gray-100 rounded-md shadow-sm space-y-3 md:space-y-0"
          >
            <div className="flex-grow">
              <span
                className={`${
                  todo.completed ? 'line-through text-gray-500' : 'text-black'
                } text-lg font-medium`}
              >
                {todo.title}
              </span>
              <p className="mt-2 text-gray-700">{todo.description}</p>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <div
                className={`${
                  todo.priority === 'High'
                    ? 'text-red-500'
                    : todo.priority === 'Low'
                    ? 'text-yellow-500'
                    : 'text-blue-500'
                } text-sm font-semibold`}
              >
                Priority: {todo.priority}
              </div>
              <div className="flex space-x-6 ">
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
  );
};

export default AllTaskGrid;
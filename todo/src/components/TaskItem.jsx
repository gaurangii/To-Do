import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(task);
  const [isDone, setIsDone] = useState(task.done || false);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(/update-task/`${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        updateTask(formData); 
        setShowEdit(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating task:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };
  

  const handleToggleCompletion = () => {
    setIsDone(!isDone);
    updateTask({ ...task, done: !isDone });
  };

  const isTaskOverdue = new Date(task.date) < new Date();

  const containerClasses = `p-4 my-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${
    isDone ? "bg-green-100" : isTaskOverdue ? "bg-red-100" : "bg-white"
  }`;

  return (
    <div className={containerClasses}>
      <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 mt-1">Due: {task.date}</p>
      <p className={`text-sm mt-1 ${task.priority === "High" ? "text-red-500" : "text-green-500"}`}>
        {task.priority} Priority
      </p>

      {isTaskOverdue && !isDone && (
        <p className="text-red-600 mt-2 text-sm">Task is overdue!</p>
      )}

      <p className="mt-2 text-gray-700">{task.description}</p>

      <div className="flex gap-4 mt-4">
  <button
    onClick={handleToggleCompletion}
    className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
      isDone ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
    }`}
  >
    {isDone ? "Done" : "Mark as Done"}
  </button>
  <button
    onClick={() => setShowEdit(true)}
    className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-300"
  >
    Edit
  </button>
  <button
    onClick={() => setShowDeleteModal(true)}
    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
  >
    Delete
  </button>
</div>

      {showDeleteModal && (
        <ConfirmationModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={() => {
            deleteTask(task.id);
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-lg space-y-4"
          >
            <h2 className="text-xl font-bold">Edit Task</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleEdit}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleEdit}
              className="w-full p-3 border rounded-lg"
              required
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleEdit}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Low">Low Priority</option>
              <option value="High">High Priority</option>
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleEdit}
              className="w-full p-3 border rounded-lg"
              placeholder="Task Description"
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
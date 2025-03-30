import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showLoginForm, setShowLoginForm] = useState(false); // Track login form visibility
  const [user, setUser] = useState({ username: "", password: "" }); // User object with username and password
  const [error, setError] = useState(""); // Error handling
  const token = localStorage.getItem("token");
  console.log(token);
  
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = user;

    if (username && password) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful:", data);
          setIsLoggedIn(true);
          setShowLoginForm(false);
          setError("");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      } catch (err) {
        console.error("Error during login:", err);
        setError("Something went wrong. Please try again.");
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-3/12 h-screen bg-gradient-to-r from-indigo-900 to-gray-800 p-8 rounded-lg shadow-xl z-50">
      {/* Header */}
      <div>
        <h3 className="text-white mb-44 font-bold text-4xl mt-12">Task Manager</h3>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-6 text-white text-left text-xl font-semibold">
        <li
          className="hover:text-indigo-300 cursor-pointer hover:translate-x-2 transform transition-all duration-300 ease-in-out"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="hover:text-indigo-300 cursor-pointer hover:translate-x-2 transform transition-all duration-300 ease-in-out"
          onClick={() => navigate("/alltasks")}
        >
          All Tasks
        </li>
        <li
          className="hover:text-indigo-300 cursor-pointer hover:translate-x-2 transform transition-all duration-300 ease-in-out"
          onClick={() => navigate("/completed")}
        >
          Completed
        </li>
        <li
          className="hover:text-indigo-300 cursor-pointer hover:translate-x-2 transform transition-all duration-300 ease-in-out"
          onClick={() => navigate("/notCompleted")}
        >
          To-Do
        </li>
      </ul>
      
      {isLoggedIn ? (
        <div className="fixed top-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
          {getInitials(user.username)}
        </div>
      ) : (
        <button
        //   onClick={() => setShowLoginForm(true)}
        onClick={() => navigate("/signin")}
          className="fixed top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Login
        </button>
      )}

      {/* Login Form Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80"
          >
            <h2 className="text-xl font-bold text-center">Login</h2>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
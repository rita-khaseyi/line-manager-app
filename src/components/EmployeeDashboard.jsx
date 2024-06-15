// src/components/EmployeeDashboard.jsx

import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css'; // Import your CSS file

const EmployeeDashboard = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const userTasks = storedTasks.filter(task => task.assignedTo === currentUser.id);
    setTasks(userTasks);
  }, [currentUser.id]);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.map(task =>
      tasks.find(t => t.id === task.id) || task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

  const handleTaskStatusChange = (taskId, status) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const handleClearCompletedTasks = () => {
    const activeTasks = tasks.filter(task => task.status !== 'done');
    setTasks(activeTasks);
  };

  return (
    <div className="employee-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#tasks">Your Tasks</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
      <h2><p className="mb-6 text-primary">Hello Rita 👋! Welcome </p></h2>

        {/* Display user's tasks */}
        <div id="tasks">
          <h3>Your Tasks</h3>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.title} - {task.status}
                <select className='employee'
                  value={task.status}
                  onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                >
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </li>
            ))}
          </ul>

          {/* Button to clear completed tasks */}
          <button onClick={handleClearCompletedTasks}>Clear Completed Tasks</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

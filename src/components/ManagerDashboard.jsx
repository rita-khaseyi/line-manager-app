import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerDashboard.css';

const ManagerDashboard = ({ currentUser }) => {
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // Load departments, tasks, and users from localStorage on initial render
  useEffect(() => {
    const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setDepartments(storedDepartments);
    setTasks(storedTasks);
    setUsers(storedUsers);

    // Fetch tasks from JSON API
    fetchTasksFromAPI();
  }, []);

  // Function to fetch tasks from JSON API
  const fetchTasksFromAPI = async () => {
    try {
      const response = await axios.get('');
      const fetchedTasks = response.data;
      setTasks(fetchedTasks);
      localStorage.setItem('tasks', JSON.stringify(fetchedTasks)); // Update localStorage with fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Update localStorage whenever departments or tasks change
  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [departments, tasks]);

  // Function to add a new department 
  const addDepartment = (name) => {
    const newDepartment = { id: Date.now(), name, employees: [] };
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    localStorage.setItem('departments', JSON.stringify(updatedDepartments));
  };

  // Function to assign a new task 
  const assignTask = (task) => {
    const newTask = { ...task, id: Date.now(), assignedTo: task.assignedTo.id };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to edit an existing task 
  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? updatedTask : task);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to delete a task 
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to move an employee between departments 
  const moveEmployee = (employeeId, fromDeptId, toDeptId) => {
    const updatedDepartments = departments.map(dept => {
      if (dept.id === fromDeptId) {
        return { ...dept, employees: dept.employees.filter(empId => empId !== employeeId) };
      }
      if (dept.id === toDeptId) {
        return { ...dept, employees: [...dept.employees, employeeId] };
      }
      return dept;
    });
    setDepartments(updatedDepartments);
    localStorage.setItem('departments', JSON.stringify(updatedDepartments));
  };

  // Function to remove an employee from all departments 
  const removeEmployee = (employeeId) => {
    const updatedDepartments = departments.map(dept => ({
      ...dept,
      employees: dept.employees.filter(empId => empId !== employeeId)
    }));
    setDepartments(updatedDepartments);
    localStorage.setItem('departments', JSON.stringify(updatedDepartments));
  };

  return (
    <div className="manager-dashboard">
      {/* Sidebar */}
      <div className="sidebar">

        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#departments">Departments</a></li>
          <li><a href="#tasks">Tasks</a></li>
          <li><a href="#employees">Employees</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2><p className="mb-6 text-primary">Hello Rita 👋! Welcome </p></h2>

        {/* Form to create a new department */}
        <div id="departments">
          <h3>Create Department</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            addDepartment(name);
            e.target.reset();
          }}>
            <input type="text" name="name" placeholder="Department Name" required />
            <button type="submit">Add Department</button>
          </form>
        </div>

        {/* Display list of departments */}
        <div>
          <h3>Departments</h3>
          <ul>
            {departments.map(dept => (
              <li key={dept.id}>
                {dept.name}
                <ul>
                  {/* Display employees in each department */}
                  {dept.employees.map(empId => {
                    const employee = users.find(user => user.id === empId);
                    return <li key={empId}>{employee?.name}</li>;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Form to assign a new task */}
        <div id="tasks">
          <h3>Tasks</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.elements.title.value;
            const description = e.target.elements.description.value;
            const assignedTo = users.find(user => user.id === parseInt(e.target.elements.assignedTo.value));
            assignTask({ title, description, status: 'in progress', assignedTo });
            e.target.reset();
          }}>
            <input type="text" name="title" placeholder="Task Title" required />
            <input type="text" name="description" placeholder="Task Description" required />
            <select name="assignedTo" required>/* ManagerDashboard.css */

              <option value="">Assign to</option>
              {users.filter(user => user.role === 'employee').map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button type="submit">Assign Task</button>
          </form>

          {/* Display list of tasks */}
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.title} - {task.description}
                <button onClick={() => editTask(task.id, { ...task, status: 'completed' })}>Mark as Done</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Form to move an employee between departments */}
        <div id="employees">
          <h3>Move Employee</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const employeeId = parseInt(e.target.elements.employeeId.value);
            const fromDeptId = parseInt(e.target.elements.fromDeptId.value);
            const toDeptId = parseInt(e.target.elements.toDeptId.value);
            moveEmployee(employeeId, fromDeptId, toDeptId);
            e.target.reset();
          }}>
            <select name="employeeId" required>
              <option value="">Select Employee</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <select name="fromDeptId" required>
              <option value="">From Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            <select name="toDeptId" required>
              <option value="">To Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            <button type="submit">Move Employee</button>
          </form>
        </div>

        {/* Form to remove an employee from all departments */}
        <div>
          <h3>Remove Employee</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const employeeId = parseInt(e.target.elements.employeeId.value);
            removeEmployee(employeeId);
            e.target.reset();
          }}>
            <select name="employeeId" required>
              <option value="">Select Employee</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button type="submit">Remove Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

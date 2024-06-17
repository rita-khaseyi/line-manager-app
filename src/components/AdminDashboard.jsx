import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  // State to store user data
  const [users, setUsers] = useState([]);

  // Fetch users from local storage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle role change for a user
  const handleRoleChange = (id, role) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, role } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#assign-roles">Assign Roles</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2><p className="mb-6 text-primary">Hello Rita 👋! Welcome </p></h2>

        {/* Assign Roles Section */}
        <div id="assign-roles">
          <h3>Assign Roles</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name} - {user.role}
                <select className='employee'
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option className='employee' value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

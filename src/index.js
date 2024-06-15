import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Initialize admin user data in local storage if not already present
const initializeAdminUser = () => {
  const adminUser = {
    id: 1,
    name: 'Rita Khaseyi',
    email: 'admin@gmail.com',
    password: 'admin', // Example password (should be securely managed)
    role: 'admin',
  };

  // Retrieve existing users from local storage or initialize an empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if admin user already exists in users array
  const existingAdmin = users.find(user => user.email === adminUser.email);

  // If admin user does not exist, add it to the users array
  if (!existingAdmin) {
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
};

// Call the initialization function when the application starts
initializeAdminUser();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

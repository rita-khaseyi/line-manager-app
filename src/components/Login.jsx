import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'manager') {
        navigate('/manager-dashboard');
      } else if (user.role === 'employee') {
        navigate('/employee-dashboard');
      } else {
        alert('Invalid role or credentials');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  const imageContainerStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/lands.jpg)`,
  };

  return (
    <div className="login-container">
      <div className="image-container" style={imageContainerStyle}>
        <div className="gradient-overlay"></div>
  
      </div>
      <div className="form-container">
        <h1 className="text-primary font-bold text-2xl">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">Login</button>
        </form>
        <p className="mt-3 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

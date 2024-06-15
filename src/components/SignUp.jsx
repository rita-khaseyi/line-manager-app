import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { id: users.length + 1, name, email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/login');
  };

  const imageContainerStyle = {
    flex: 1,
    position: 'relative',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/lands.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <div className="flex gap-12 items-center mb-6">
          <h1 className="text-primary font-bold text-2xl">Sign Up</h1>
        </div>
        <p className="mb-6 text-primary">Welcome, 👋 please complete your profile</p>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input-field"
            required
          />
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
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field choice" id='choice'>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          <button type="submit" className="submit-button">Sign Up</button>
          <p className="mt-3 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
        </form>
      </div>
      <div style={imageContainerStyle} className="image-container">
        <div className="gradient-overlay"></div>
        <div className="image-text">
         
              </div>
      </div>
    </div>
  );
};

export default SignUp;

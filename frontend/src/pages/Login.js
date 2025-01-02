import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      // const { token, user } = response.data;
      // localStorage.setItem("token", token);
      // setMessage(`Login successful! Welcome, ${user.name}.`);
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful! Welcome, ${response.data.user.name}.');
    } catch (error) {
      setMessage(error.response.data.message || 'Error logging in');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

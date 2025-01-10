import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      localStorage.setItem('token', response.data.token);
      const user = response.data.user;
      setMessage(`Login successful! Welcome, ${user.name}!`);
    } catch (error) {
      setMessage(error.response.data.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
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
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              Processing...
              <span className="spinner"></span>
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p type="button" onClick={handleRegisterRedirect} className="redirect">
        Register New User
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

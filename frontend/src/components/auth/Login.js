import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7777/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        navigate('/todo');
      } else {
        const message = await response.text();
        throw new Error(message)
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error);
    }
    console.log("Login with:", email, password);
  };

  return (
    <div className="auth-page">
        <div className="auth-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
          <div>
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </div>
    </div>
  );
}

export default Login;

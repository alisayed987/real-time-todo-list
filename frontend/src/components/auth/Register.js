import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      const response = await fetch('http://localhost:7777/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      if (response.ok) {
        const res = await response.json();
        if (res.token) {
          localStorage.setItem('token', res.token);
          navigate('/todo');
        }
      } else {
        const message = await response.text();
        throw new Error(message)
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error);
    }
    console.log("Register with:", email, password);
  };

  return (
    <div className="auth-page">
        <div className="auth-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
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
            <button type="submit">Register</button>
          </form>
          <Link to="/">Already have an account? Login</Link>
        </div>
    </div>
  );
}

export default Register;

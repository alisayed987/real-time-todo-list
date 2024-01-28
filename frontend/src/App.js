import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TodoApp from "./components/TodoApp";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<ProtectedRoute component={TodoApp} />} />
      </Routes>
    </Router>
  );
}

export default App;

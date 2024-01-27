import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';


function App() {

  return (
    <div className="app">
      <div className="header">
        <h1>Todo List</h1>
      </div>
    </div>
  );
}

export default App;

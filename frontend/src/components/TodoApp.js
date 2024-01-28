import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import "./css/TodoApp.css";
import { useNavigate } from 'react-router-dom';

const ENDPOINT = "http://localhost:7777";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);
  const [statuses, setStatuses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Set JWT to socket header
     */
    const token = localStorage.getItem("token");

    // 1) Fetch statuses
    fetch('http://localhost:7777/api/statuses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
    })
      .then(response => response.json())
      .then(data => setStatuses(data))
      .catch(error => console.error('Error fetching statuses:', error));

    // 2) init socket connection
    const newSocket = io(ENDPOINT, {
      extraHeaders: {
        token: token,
      },
    });
    setSocket(newSocket);

    /**
     * On connect
     */
    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("fetchTasks");
    });

    /**
     * On setting tasks
     */
    newSocket.on("tasks", async (data) => {
      console.log(data);
      if (data.success) {
        setTasks(data.tasks);
      } else {
        console.log(data.message)
        alert(data.message)
      }
    });

    newSocket.on("connect_error", (error) => {
      console.log("Connection Error:", error);
    });

    newSocket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect");
    });

    return () => newSocket.close();
  }, [setSocket]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Todo List</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="todo-container">
        <AddTodo socket={socket} statuses={statuses}/>
        <TodoList tasks={tasks} socket={socket} statuses={statuses}/>
      </div>
    </div>
  );
}

export default TodoApp;

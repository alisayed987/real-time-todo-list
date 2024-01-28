import React, { useState } from 'react';
import './css/AddTodo.css';

function AddTodo({ socket , statuses}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('addTask', { title, description, statusName:  selectedStatus});
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description"
      />
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="status-select"
      >
        <option value="">Select Status</option>
        {statuses.map(status => (
          <option key={status.id} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTodo;

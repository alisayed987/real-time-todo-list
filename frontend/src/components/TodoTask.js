import React, { useState } from "react";
import "./css/TodoTask.css";

function TodoTask({ task, socket, statuses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const [selectedStatus, setSelectedStatus] = useState(task.Status.name);

  /**
   * On Edit the todo task
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * On cancelling the edit of the todo task
   */
  const cancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setSelectedStatus(task.Status.name)
    setIsEditing(false);
  };

  /**
   * On Submit edits of todo task (update)
   */
  const handleUpdate = () => {
    socket.emit("updateTask", task.id, {
      title: editedTitle,
      description: editedDescription,
      statusName: selectedStatus
    });

    setEditedTitle("");
    setEditedDescription("");
    setIsEditing(false);
  };

  /**
   * On delete todo task
   */
  const handleDelete = () => {
    socket.emit("deleteTask", task.id);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <div>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status-select">Status:</label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="status-select"
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.name}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
        <div>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div>{task.Status.name}</div>
        </div>
        </>
      )}
      <button onClick={isEditing ? cancelEdit : handleEdit}>
        {isEditing ? "Cancel Edit" : "Edit"}
      </button>
      <button onClick={isEditing ? handleUpdate : handleDelete}>
        {isEditing ? "Update" : "Delete"}
      </button>
    </div>
  );
}

export default TodoTask;

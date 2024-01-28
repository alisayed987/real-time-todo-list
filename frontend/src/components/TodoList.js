import React from 'react';
import TodoTask from './TodoTask';
import './css/TodoList.css';

function TodoList({ tasks, socket, statuses}) {
  return (
    <div>
      {tasks.map(task => (
        <TodoTask key={task.id} task={task} socket={socket} statuses={statuses} />
      ))}
    </div>
  );
}

export default TodoList;
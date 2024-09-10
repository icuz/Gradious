import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { text: "read", isCompleted: false },
    { text: "GYM", isCompleted: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    setTodos([...todos, { text: newTodo, isCompleted: false }]);
    setNewTodo('');
  };

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
    <div className="todo-app">
      <h1>My Todo List 🗒️</h1>
      <div className="todo-list-container">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              <input 
                type="checkbox" 
                checked={todo.isCompleted} 
                onChange={() => handleComplete(index)} 
              />
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </form>
    </div>
    </div>
  );
}

export default App;

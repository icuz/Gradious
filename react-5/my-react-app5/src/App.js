import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-app">
      <h1>counter: {count}</h1>
      <div className="button-group">
        <button onClick={() => setCount(count - 1)}>decrease</button>
        <button onClick={() => setCount(count + 1)}>increment</button>
      </div>
    </div>
  );
}

export default App;

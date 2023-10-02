import React from 'react';

function App() {
  let todoList = [
    {id: 1, title: "Complete assignment"},
    {id: 2, title: "Practice more"},
    {id: 3, title: "Have a rest"},
  ];

  return (
  <div>
    <h1>Todo List</h1>
    <ul>
      {todoList.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  </div>
  );
}

export default App;

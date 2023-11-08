import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
  const [todoList, setTodoList] = React.useState(savedTodoList);
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  React.useEffect(() => {
    localStorage.setItem('savedTodoList',JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;

import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function useSemiPersistentState() {
  const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
  const [todoList, setTodoList] = React.useState(savedTodoList);


  React.useEffect(() => {
    localStorage.setItem('savedTodoList',JSON.stringify(todoList));
  }, [todoList]);
  
  return [todoList, setTodoList]
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;

import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


function App() {

  const [todoList, setTodoList] = React.useState([]);

  React.useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
    setTodoList(savedTodoList)
  }, []);

  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  React.useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: [] } });
      }, 2000)    
    });
    myPromise.then((result) => {
      setTodoList(result.data.todoList);
    })
}, []);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}


export default App;

import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
    setTodoList(savedTodoList)
    setIsLoading(false)
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [],
            },
          });
        }, 2000);
      });

      myPromise
        .then((result) => {
          setTodoList(result.data.todoList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}


export default App;

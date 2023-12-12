import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
     
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  } 

  React.useEffect(() => {
    fetchData()
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
  };

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

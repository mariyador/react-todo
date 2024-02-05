import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './App.module.css';


function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    const apiOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    const apiUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(apiUrl, apiOptions);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
     
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
        timestamp: record.createdTime,
      }));

      setTodoList(todos.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));      setIsLoading(false);
    } catch (apiError) {
      console.error('API Error fetching data:', apiError.message);
      // If API fetch fails, it will fetch from local storage
      const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
      setTodoList(savedTodoList);
    } finally {
      setIsLoading(false);
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

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  };

  //Delete from Airtable
  const deleteTodoFromAirtable = async (id) => {
    const apiOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    const apiUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(apiUrl, apiOptions);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (apiError) {
      console.error('API Error deleting data:', apiError.message);
    }
  };

  const removeTodo = (id) => {
    deleteTodoFromAirtable(id);
  };

  return (
    <BrowserRouter>
       <nav>
      <ul className={style.NavLink}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">New Todo</Link>
        </li>
      </ul>
    </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <h1>New Todo List</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

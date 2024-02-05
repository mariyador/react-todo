import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function TodoContainer({ tableName }) {
    
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {

    const viewQueryParam = 'Grid%20view';

    const apiOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    const apiUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=${viewQueryParam}`;

    try {
      const response = await fetch(apiUrl, apiOptions);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
     
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (apiError) {
      console.error('API Error fetching data:', apiError.message);
      // If API fetch fails, it will fetch from local storage
      const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
      setTodoList(savedTodoList);
    } finally {
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    fetchData()
  }, [tableName]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (title) => {
    setTodoList([...todoList, title]);
  };

  //Delete from Airtable
  const remoteTodo = async (id) => {
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
    remoteTodo(id);
  };
  
    return (
      <div>
        <h1>{`Todo List - ${tableName}`}</h1>
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
      </div>
    );
  }
  
  TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
  };
  
  export default TodoContainer;



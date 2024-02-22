import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import style from './TodoContainer.module.css';


function TodoContainer({ initialTableName }) {
    
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [tableName, setTableName] = useState(
    localStorage.getItem('savedTableName') || initialTableName
  );

  // Function to fetch data from Airtable
  const fetchData = useCallback(async ()  => {

    const viewQueryParam = 'Grid%20view';

    const apiOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    // Constructing the API URL with view and sort parameters
    const sortQueryParam = 'sort[0][field]=title&sort[0][direction]=asc'

    const apiUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=${viewQueryParam}&${sortQueryParam}`;

    try {
      const response = await fetch(apiUrl, apiOptions);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Sorting the fetched todos based on the current sortOrder
      const sortedTodos = data.records.sort((objectA, objectB) =>
      sortOrder === 'asc'
        ? objectA.fields.title.localeCompare(objectB.fields.title)
        : objectB.fields.title.localeCompare(objectA.fields.title)
      );

      // Mapping the sorted todos to a simplified format and updating state
      const todos = sortedTodos.map((record) => ({
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
  }, [sortOrder]);
    
  // Function to toggle sorting order (asc/desc)
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // useEffect to fetch data when tableName or sortOrder changes
  useEffect(() => {
    fetchData()
  }, [fetchData, sortOrder]);
  
  // useEffect to save todos to local storage when todoList or isLoading changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // Function to add a new todo
  const addTodo = (title) => {
    setTodoList([...todoList, title]);
  };

  // Function to delete a todo from Airtable
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
      
      // Updating state after successful deletion
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (apiError) {
      console.error('API Error deleting data:', apiError.message);
    }
  };

  // Function to handle removal of a todo
  const removeTodo = (id) => {
    remoteTodo(id);
  };


  const updateTableName = () => {
    const newTableName = prompt('Enter a new table name:', tableName);
    if (newTableName !== null && newTableName.trim() !== '') {
      setTableName(newTableName.trim());
      localStorage.setItem('savedTableName', newTableName.trim());
    }
  };
  
  // Rendering the TodoContainer component
  return (
    <div className={style.TodoContainer}>
      <button 
       className={style.sortButton}
       onClick={toggleSortOrder}
      >
        Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>
      <h1 className={style.title} onClick={updateTableName}>
        {`${tableName}`}
      </h1> 
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
      <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}  
    </div>
  );
}

// Prop types for TodoContainer component
TodoContainer.propTypes = {
  initialTableName: PropTypes.string.isRequired,
};
  
export default TodoContainer;
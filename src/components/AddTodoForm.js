import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const apiOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({ fields: { title: todoTitle } }),
    };
    
    const apiUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(apiUrl, apiOptions);
    
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
    
      const data = await response.json();
      const newTodo = {
        title: data.fields.title,
        id: data.id,
      };
    
      onAddTodo(newTodo);
      setTodoTitle('');
    } catch (apiError) {
      console.error('API Error adding todo:', apiError.message);
    }
  }
    
  return (
    <form onSubmit={handleAddTodo} className={style.AddTodoForm}>
      <InputWithLabel
        id="todoList"
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}      
      >
        Title:
      </InputWithLabel>
      <button type="submit" className={style.Button}>
        <FaPlus className={style.Icon} />
        Add
      </button>
    </form>
  )
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;

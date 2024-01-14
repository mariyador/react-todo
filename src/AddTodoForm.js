import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import { FaPlus } from 'react-icons/fa';


function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = React.useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log(todoTitle);
        onAddTodo({title: todoTitle, id: Date.now()});
        setTodoTitle('');
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

export default AddTodoForm;
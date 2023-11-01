import React from 'react';

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
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoList">Title </label>
            <input type="text" id="todoList" name='title' value={todoTitle} onChange={handleTitleChange}></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;
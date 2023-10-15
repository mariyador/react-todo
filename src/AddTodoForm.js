import React from 'react';

function AddTodoForm() {
    let handleAddTodo = (event) => {
        event.preventDefault();
        let todoTitle = event.target.elements.title.value;
        console.log(todoTitle);
        event.target.reset();
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoList">Title </label>
            <input type="text" id="todoList" name='title'></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;
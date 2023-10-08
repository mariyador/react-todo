import React from 'react';

function AddTodoForm() {
    return (
        <form>
            <label htmlFor="todoList">Title </label>
            <input type="text" id="todoList"></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;
import React from 'react';
import TodoListItem from './TodoListItem';

let todoList = [
    {id: 1, title: "Complete assignment"},
    {id: 2, title: "Practice more"},
    {id: 3, title: "Have a rest"},
];

function TodoList() {
    return(
        <ul>
            {todoList.map((item) => (
                <TodoListItem key={item.id} todo={item} />
            ))}
        </ul>
    )
}

export default TodoList;
import React from 'react';

let todoList = [
    {id: 1, title: "Complete assignment"},
    {id: 2, title: "Practice more"},
    {id: 3, title: "Have a rest"},
];

function TodoList() {
    return(
        <ul>
            {todoList.map((item) => (
            <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    )
}

export default TodoList;
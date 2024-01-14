import React from 'react';
import style from './TodoListItem.module.css';
import { FaTrash } from 'react-icons/fa';

function TodoListItem({ todo, onRemoveTodo }) {
    return (
        <li className={style.ListItem}>
            {todo.title}
            <button type="button" onClick={() => onRemoveTodo(todo.id)} className={style.Button}>
            <FaTrash className={style.Icon}  />
            Remove
            </button>
        </li>
    )
}

export default TodoListItem;
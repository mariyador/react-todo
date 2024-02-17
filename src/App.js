import React from 'react';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './App.module.css';

function App() {

  return (
    <BrowserRouter>
      <nav>
        <ul className={style.NavLink}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todolist">Todo List</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route
        path="/"
        element={
          <div className={style.welcomeText}>
            <h1>Hello!</h1>
            <p>Welcome to your daily planner! <br />
            Stay organized, stay productive.
            </p>
          </div>
        }
      />
        <Route
          path="/todolist"
          element={
            <>
              <TodoContainer initialTableName="YourInitialTableName"/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

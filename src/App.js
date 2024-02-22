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
            <Link to="/new">New Todo</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TodoContainer initialTableName="YourInitialTableName"/>
            </>
          }
        />
        <Route
          path="/new"
          element={
            <h1>New Todo List</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

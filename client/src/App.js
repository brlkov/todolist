import React from "react";
import Header from "./components/header";
import TodoList from "./components/todoList";
import "./style.scss"

function App() {
    return (
        <div className="todos">
            <Header/>
            <TodoList/>
        </div>
    );
}

export default App;

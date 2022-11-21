import React, {useEffect, useState} from 'react';
import axios from "axios";
import TodoItem from "./todoItem";

const TodoList = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos().then(response => setTodos(response.data))
    }, [])

    const getTodos = async () => {
        return await axios.get("http://localhost:4000/api")
    }

    return (
        <div>
            {todos.sort((a, b) => a.id - b.id).reverse().map(todo =>
                <TodoItem id={todo.id} name={todo.name} date={todo.date} description={todo.description} done={todo.done} files={todo.files} key={todo.id}/>
            )}
        </div>
    );
};

export default TodoList;
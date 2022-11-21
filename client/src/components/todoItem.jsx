import React, {useState} from 'react';
import axios from "axios";
import dayjs from "dayjs";

const TodoItem = ({id, name, date, description, done, files}) => {

    const [newName, setNewName] = useState('')
    const [newDate, setNewDate] = useState('')
    const [newDescription, setNewDescription] = useState('')

    const refactorTodo = async () => {
        await axios.post("http://localhost:4000/api/refactor", {id: id, name: newName, date: newDate, description: newDescription})
        document.location.reload()
    }

    const deleteTodo = async () => {
        await axios.post("http://localhost:4000/api/delete", {id: id})
        document.location.reload()
    }

    const doneTodo = async () => {
        await axios.post("http://localhost:4000/api/done", {id: id})
        document.location.reload()
    }


    const openRefactor = (id) => {
        document.querySelector(`#r${id}`).classList.add("open")
    }
    const closeRefactor = () => {
        document.querySelector(`#r${id}`).classList.remove("open")
    }



    return (
        <div className="todoItem">
            <div className="main">
                <div>{name}</div>
                <div>{date.substring(0, 10)}</div>
            </div>
            <div className="description">{description}</div>
            <div className="files">
                {files ? files.map(file => <a key={file} target="_blank" rel="noreferrer" href={"http://localhost:4000/" + file}>{file}</a>) : <div></div>}
            </div>
            <div className="tools">
                <div className="info">
                    {done === true ?
                        <p id="done">Выполнено</p>
                        : (dayjs() > dayjs(date)) ?
                            <p id="overdue">Просрочено</p>
                            : <p id="notDone">Не выполнено</p>}
                </div>
                <div className="buttons">
                    <button id="refactor" onClick={() => openRefactor(id)}></button>
                    <button id="delete" onClick={deleteTodo}></button>
                    <button id="do" onClick={doneTodo}></button>
                </div>
            </div>
            <div id={`r${id}`} className="refactor">
                <div className="nameDate">
                    <input
                        id="name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        type="text"
                        placeholder="New name"
                    />
                    <input
                        id="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        type="date"
                        placeholder="New date"
                    />
                </div>
                <input
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    type="text"
                    placeholder="New description"
                />
                <div className="refactorButtons">
                    <button onClick={refactorTodo}>Изменить</button>
                    <button onClick={closeRefactor}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
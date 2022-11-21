import React, {useRef, useState} from 'react';
import axios from "axios";

const NewTask = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [files, setFiles] = useState([])
    const chooseMessage = useRef()

    const createNewTask = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('date', date)
        formData.append('description', description)
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i])
            }
        }
        const newTask = await axios.post("http://localhost:4000/api/create", formData)
        console.log(newTask)
        document.location.reload()
    }

    const closeNewTask = () => {
        document.querySelector(".newTask").classList.remove("open")
    }

    const addFiles = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i])
        }
        chooseMessage.current.textContent = "Выбранных файлов: " + files.length
    }

    return (
        <div className="newTask">
            <div className="nameDate">
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Название"
                />
                <input
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    placeholder="Date"
                />
            </div>
            <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Описание"
            />
            <div className="inputFiles">
                <input
                    id="files"
                    type="file" multiple
                    onChange={(e) => {
                        addFiles(e)
                    }}
                />
                <label ref={chooseMessage} htmlFor="files">Добавить файлы</label>
            </div>
            <div className="addButton">
                {name && date && description ? <button onClick={createNewTask}>Создать задачу</button> : <button onClick={closeNewTask}>Отмена</button>}
            </div>
        </div>
    );
};

export default NewTask;
const path = require('path')
const {todo} = require("./model");

class controller {

    async create(req, res) {
        const {name, date, description} = req.body

        if (req.files === null) {
            await todo.create({name, date, description})
        }
        else {
            const {files} = req.files
            const arr = []
            // console.log(files)
            // console.log(Array.isArray(files))
            if (Array.isArray(files)) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    file.mv(path.resolve(__dirname, 'static', file.name))
                    arr.push(file.name)
                }
            } else {
                files.mv(path.resolve(__dirname, 'static', files.name))
                arr.push(files.name)
            }
            await todo.create({name, date, description, files: arr})
        }

        const todos = await todo.findAll()
        return res.json(todos)
    }



    async delete(req, res) {
        const {id} = req.body
        const deleteTodo = await todo.findOne({where: id})
        await deleteTodo.destroy()
        const todos = await todo.findAll()
        return res.json(todos)
    }

    async done(req, res) {
        const {id} = req.body
        const doneTodo = await todo.findOne({where: id})
        doneTodo.done = !doneTodo.done
        await doneTodo.save()
        const todos = await todo.findAll()
        return res.json(todos)
    }

    async refactor(req, res) {
        const {id, name, date, description} = req.body
        const refactorTodo = await todo.findOne({where: id})
        if (name) {
            refactorTodo.name = name
        }
        if (date) {
            refactorTodo.date = date
        }
        if (description) {
            refactorTodo.description = description
        }
        await refactorTodo.save()
        const todos = await todo.findAll()
        return res.json(todos)
    }

    async getAll(req, res) {
        const todos = await todo.findAll()
        return res.json(todos)
    }

}

module.exports = new controller()

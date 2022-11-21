const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const todo = sequelize.define('todo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    description: {type: DataTypes.STRING},
    files: {type: DataTypes.ARRAY(DataTypes.STRING)},
    done: {type: DataTypes.BOOLEAN, defaultValue: false}
})

module.exports = {
    todo
}

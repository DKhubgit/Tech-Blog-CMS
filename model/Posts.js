const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config');

class Posts extends Model {};

Posts.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'posts',
}
);

module.exports = Posts;
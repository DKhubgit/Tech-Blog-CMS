const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comments extends Model {};

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id',
        }
    },
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'comments',
})

module.exports = Comments;
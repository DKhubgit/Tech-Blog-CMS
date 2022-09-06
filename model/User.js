const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt= require('bcrypt');

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, //cannot be an empty string
            notNull: true, //cannot be null
            len: [8, 20], //allow length of password to be between 8 and 16 characters
            is: /[a-z]/, //includes a lowercase letter
            is: /[A-Z]/, //includes an uppercase letter
            is: /[0-9]/, //includes a number
        }
    },
},
{
    hooks: {
        async beforeCreate(user) {
            user.password = await bcrypt.hash(user.password, 3);
            return user;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'user',
});

module.exports = User;
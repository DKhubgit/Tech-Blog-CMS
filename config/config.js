const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL); //connects to heroku DB add-on if it exists, else go to local.
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.USER,
        process.env.PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    )
}

module.exports = sequelize;
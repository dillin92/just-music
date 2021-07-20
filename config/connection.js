// const Sequelize = require('sequelize');

// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
// });

// module.exports = sequelize;

// Connect to database

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
            host: 'localhost',
            user: 'root',
            password: 'Buddydog2015!',
            database: 'users'
    },
    console.log('Connected to the users database.')
);

module.exports = db;
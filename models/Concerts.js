// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Concerts extends Model {}

// Concerts.init(
//     {
//         id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         concert_name: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         concert_date: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         concert_details: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'user',
//                 key: 'id'
//             }
//         }
//     },
//     {
//         sequelize,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'concerts'
//     }
// );

// module.exports = Concerts;
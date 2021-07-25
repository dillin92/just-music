// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class TopArtists extends Model {}

// TopArtists.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },

//          artist_name: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 validate: {
//                     len: [1]
//                 }


//             },

//         // artist_img: {
//         //     type: DataTypes.,
//         //     allowNull: false
//         // },
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
//         modelName: 'TopArtists'
//     }
// );

// module.exports = TopArtists;
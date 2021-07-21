const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Concerts extends Model {}

Concerts.init(
    {
        id: {
            type: dataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        concert_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Concerts'
    }
);

moodule.exports = Concerts;
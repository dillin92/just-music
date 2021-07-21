const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TopArtists extends Model {}

TopArtists.init(
    {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        artist: {
            artistName: DataTypes.STRING,
            artistImg: DataTypes.STRING,
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
        modelName: 'TopArtists'
    }
);

moodule.exports = TopArtists;
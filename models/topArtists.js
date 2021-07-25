const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TopArtist extends Model {}

TopArtist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        artist_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        artist_image: {
            type: DataTypes.BLOB,
            allowNull: true
        
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
        modelName: 'topArtists'
    }
);

module.exports = TopArtist;
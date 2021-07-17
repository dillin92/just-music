const { Model, DataTypes } =require('sequelize');
const sequelize = require('../config/connection');


class Post extends model {
    Post.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            }
        }
    )
}
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPswd){
        return bcrypt.compareSync(loginPswd, this.password);
    }
};

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type:{},
        // user_name:{
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true
        // },
        email_address:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
            isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 16]
            } 
        }
    },{
        hooks:{
            async beforeCreate(newUser){
                newUser.password = await bcrypt.hash(newuser.password,10);
                return newUser;
            },
            async beforeUpdate(updatedUser) {
                updatedUser.password = await bcrypt.hash(updatedUser.password);
                return updatedUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'    
    },
);

module.exports = User;
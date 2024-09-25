"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
            User.hasOne(models.Admin, {foreignKey: "user_id"});
            User.hasOne(models.Manager, {foreignKey: "user_id"});
            User.hasOne(models.Staff, {foreignKey: "user_id"});
            User.hasOne(models.Customer, {foreignKey: "user_id"});
            User.belongsTo(models.Role, {foreignKey: "role_id"});
        }
    }

    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            google_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive"),
                defaultValue: "active",
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "User",
            timestamps: true,
            underscored: true,
        }
    );

    return User;
};
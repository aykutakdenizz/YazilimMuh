const Project = require("./Project");

const sequelize = require('sequelize');
const db = require('../Conf/dbConf');


const Manager = db.define('Manager', {
        id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize.Sequelize.STRING,
        },
        surname: {
            type: sequelize.Sequelize.STRING,
        },
        active_project: {
            type: sequelize.Sequelize.ARRAY(sequelize.Sequelize.INTEGER),
        },
        accounting_type: {
            type: sequelize.Sequelize.STRING,
        },
        salary: {
            type: sequelize.Sequelize.INTEGER,
        },
        experience: {
            type: sequelize.Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        tableName: "Manager"
    });
//Manager.sync();
Manager.associate = (models) => {
    Manager.hasMany(Project)
};


module.exports = Manager;
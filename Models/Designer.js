const sequelize = require('sequelize');
const db = require('../Conf/dbConf');


const Designer = db.define('Designer', {
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
            type: sequelize.Sequelize.INTEGER,
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
        tableName: "Designer"
    });
module.exports = Designer;
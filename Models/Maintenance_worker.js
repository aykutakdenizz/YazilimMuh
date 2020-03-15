const sequelize = require('sequelize');
const db = require('../Conf/dbConf');


const Maintenance_worker = db.define('Maintenance_worker', {
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
            type: sequelize.Sequelize.STRING,
        },
        accounting_type: {
            type: sequelize.Sequelize.STRING,
        },
        salary: {
            type: sequelize.Sequelize.INTEGER,
        },
        experience: {
            type: sequelize.Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        tableName: "Maintenance_worker"
    });
module.exports = Maintenance_worker;
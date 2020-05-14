const Manager = require("./Manager");

const sequelize = require('sequelize');
const db = require('../Conf/dbConf');


const Project = db.define('Project', {
        manager_id: {
            type: sequelize.Sequelize.INTEGER,
            references: {
                model: 'Manager',
                key: 'id'
            }
        },
        id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize.Sequelize.STRING,
        },
        despriction: {
            type: sequelize.Sequelize.STRING,
        },
        min_emp: {
            type: sequelize.Sequelize.INTEGER,
        },
        max_emp: {
            type: sequelize.Sequelize.INTEGER,
        },
        start_date: {
            type: sequelize.Sequelize.DATE,
        },
        end_date: {
            type: sequelize.Sequelize.DATE,
        },
        is_finished: {
            type: sequelize.Sequelize.BOOLEAN,
        },
        active: {
            type: sequelize.Sequelize.BOOLEAN,
        },
        max_analyst: {
            type: sequelize.Sequelize.INTEGER,
        },
        max_designer: {
            type: sequelize.Sequelize.INTEGER,
        },
        max_programmer: {
            type: sequelize.Sequelize.INTEGER,
        },
        max_tester: {
            type: sequelize.Sequelize.INTEGER,
        },
        max_maintenance: {
            type: sequelize.Sequelize.INTEGER,
        },
        current_emp_num: {
            type: sequelize.Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        tableName: "Project"
    });

Project.associate = (models) => {
    Project.hasOne(Manager);
};
module.exports = Project;
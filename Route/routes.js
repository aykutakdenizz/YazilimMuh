const express = require('express');
const routers = express.Router();
const controller = require('../Controller/Controllers');

routers.get('/load_all_data',controller.load_all_data);

routers.post('/create_employee',controller.create_employee);

routers.post('/assign_emp_to_project',controller.assign_emp_to_project);

routers.post('/create_project',controller.create_project);

routers.get('/load_projects',controller.load_projects);

routers.post('/start_project',controller.start_project);

routers.post('/finish_project',controller.finish_project);

routers.get('/load_employees',controller.load_employees);

routers.post('/get_specific_employees',controller.get_specific_employees);



module.exports = routers;
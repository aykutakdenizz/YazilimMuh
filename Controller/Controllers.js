const Project = require('../Models/Project');
const Manager = require('../Models/Manager');
const Analyst = require('../Models/Analyst');
const Designer = require('../Models/Designer');
const Maintenance_worker = require('../Models/Maintenance_worker');
const Programmer = require('../Models/Programmer');
const Tester = require('../Models/Tester');


function add_listeners() {
    document.addEventListener("DOMContentLoaded", load_all_data);
    document.getElementById("addEmployeeButton").addEventListener("click", create_employee);
}

exports.load_all_data = (req, res, next) => {
    Project.findAll().then(response => {
        res.status(201).json({
            Response: response
        });
    }).catch(err => {
        res.status(500).json({
            Error: 'Error occurs in database ERR:' + err
        });

    });
};

exports.create_employee = (req, res, next) => {
    const type = req.body.type;
    const name = req.body.name;
    const surname = req.body.surname;
    const accounting_type = req.body.accounting_type;
    const experience = req.body.experience;
    const salary = auto_set_salary(accounting_type, type, experience);
    switch (type) {
        case "Manager" : {
            const manager = new Manager({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary,
                active_project: []
            });
            manager.save(manager).then(result => {
                return res.status(201).json({
                    Response: result
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Error occurs in database ERR::' + err
                });
            });
            return;
        }
        case "Analyst" : {
            const analyst = new Analyst({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary,
                active_project: []
            });
            analyst.save(analyst).then(result => {
                return res.status(201).json({
                    Response: result
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Error occurs in database ERR::' + err
                });
            });
            return;
        }
        case "Designer" : {
            const designer = new Designer({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary,
                active_project: []
            });
            designer.save(designer).then(result => {
                return res.status(201).json({
                    Response: result
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Error occurs in database ERR::' + err
                });
            });
            return;
        }
        case "Programmer" : {
            const programmer = new Programmer({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary,
                active_project: []
            });
            programmer.save(programmer).then(result => {
                return res.status(201).json({
                    Response: result
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Error occurs in database ERR::' + err
                });
            });
            return;
        }
        case "Tester" : {
            const tester = new Tester({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary,
                active_project: []
            });
            tester.save(tester).then(result => {
                return res.status(201).json({
                    Response: result
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Error occurs in database ERR::' + err
                });
            });
            return;
        }
        case "Maintenance Worker" : {
            const maintenance_worker = new Maintenance_worker({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary,
                active_project: []
            });
            maintenance_worker.save(maintenance_worker).then(result => {
                return res.status(201).json({
                    Response: result
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Error occurs in database ERR::' + err
                });
            });
            return;
        }
        default : {
            return res.status(500).json({
                Error: 'This type is invalid !'
            });
        }
    }
};

function try_assign(employee, project) { // Faz
    switch (employee.constructor.name) {
        case "Analyst":
            if (project.max_analyst > 0) {
                project.max_analyst--;
                project.update({max_analyst: project.max_analyst}, {where: {id: project.id}});
                return true;
            }
            return false;
        case "Designer":
            if (project.max_designer > 0) {
                project.max_designer--;
                project.update({max_designer: project.max_designer}, {where: {id: project.id}});
                return true;
            }
            return false;
        case "Programmer":
            if (project.max_programmer > 0) {
                project.max_programmer--;
                project.update({max_programmer: project.max_programmer}, {where: {id: project.id}});
                return true;
            }
            return false;
        case "Tester":
            if (project.max_tester > 0) {
                project.max_tester--;
                project.update({max_tester: project.max_tester}, {where: {id: project.id}});
                return true;
            }
            return false;
        case "Maintenance_worker":
            if (project.max_maintenance > 0) {
                project.max_maintenance--;
                project.update({max_maintenance: project.max_maintenance}, {where: {id: project.id}});
                return true;
            }
            return false;
        default : {
            console.error("Please check the try_assign function Type of employee ->", employee.constructor.name)
        }
    }
}

exports.assign_emp_to_project = (req, res, next) => { // Faz (Employee)
    const type = req.body.type;
    const employee_id = req.body.employee_id;
    let assignedProject=null;
    const db = dbFinder(type);
    console.log(db);
    db.findOne({
        where: {
            id: employee_id
        }
    }).then(async employee => {
        console.log(employee.active_project.length);
        if ((employee.active_project.length === 0)) {
            await Project.findAll().then(async projects => {
                let can_assign;
                for (let i = 0; i < projects.length; i++) {
                    if ((projects[i].is_finished===false) && (projects[i].current_emp_num < projects[i].max_emp)){
                        can_assign = try_assign(employee, projects[i]);
                        if (can_assign) {
                            let employeeProjects = [];
                            employeeProjects.push(projects[i].id);
                            employee.update({active_project: employeeProjects}, {where: {id: employee.id}});
                            projects[i].current_emp_num++;
                            projects[i].update({current_emp_num: projects[i].current_emp_num}, {where: {id: projects[i].id}});
                            assignedProject= projects[i];
                            break;
                        }
                    }
                }
                if (can_assign) {
                    console.log(employee.name, employee.active_project, " e atandı . ");
                    return res.status(201).json({
                        Response: employee.name+" assign to ID:"+ assignedProject.id+" Name:"+assignedProject.name+"."
                    });
                } else {
                    console.log(employee.name, "Atanamadı.");
                    return res.status(400).json({
                        Error: employee.name+" can not assign!"
                    });
                }
            });

        } else {
            console.error("Bu kişi zaten atandı.");
            return res.status(400).json({
                Error: 'This employee is already in a project'
            });
        }
    }).catch(err => {
        return res.status(500).json({
            Error: 'Error occurs in database type or employee ID is invalid ERR:' + err
        });
    });
};

function calculate_compensation(salary) { // Yusuf
    // This function can be customized .
    return salary * 8.72;
}

function auto_set_salary(accounting_type, constructor_name, experience) { // Faz
    if (accounting_type === 0) {
        switch (constructor_name) {
            case "Manager":
                return 11025;
            case "Analyst":
                return 8127;
            case "Designer":
                return 7543;
            case "Programmer":
                return 7512;
            case  "Tester":
                return 5000;
            case "Maintenance Worker":
                return 6999;
        }
    } else {
        return experience * 800;
    }
}

exports.create_project = (req, res, next) => { // Yusuf
    const project = new Project({
        manager_id:req.body.manager_id,
        name: req.body.name,
        despriction: req.body.despriction,
        min_emp: req.body.min_emp,
        max_emp: req.body.max_emp,
        max_analyst: req.body.max_analyst,
        max_designer: req.body.max_designer,
        max_programmer: req.body.max_programmer,
        max_tester: req.body.max_tester,
        max_maintenance: req.body.max_maintenance,
        active: false,
        is_finished: false,
        current_emp_num:0,
    });
    project.save().then(result => {
        res.status(201).json({
            Response: result
        });
    }).catch(err => {
        res.status(500).json({
            Error: 'Error occurs in database ERR:' + err
        });
    });
};


exports.load_projects = (req, res, next) => {
    Project.findAll().then(response => {
        res.status(201).json({
            Response: response
        });
    }).catch(err => {
        res.status(500).json({
            Error: 'Error occurs in database:' + err
        });

    });
};

exports.load_employees = async (req, res, next) => { // Aykut
    await getEmployees().then(result => {
        res.status(200).json({
            Response: result
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Error occurs in database => ERR:' + err
        });
    });
};

function get_infos() { // Aykut
    // last idleri ayarla
}

exports.start_project = (req, res, next) => { // Faz(project)
    Project.findOne({where: {id: req.body.project_id}}).then(project => {
        if(project.active===true){
            return res.status(500).json({
                Error: 'Project is already active'
            });
        }
        if (project.current_emp_num >= project.min_emp) {
            Project.update({active: true, start_date: new Date(),end_date:null,is_finished:false}, {where: {id: project.id}}).then(result => {
                return res.status(201).json({
                    Response: result[0]
                });
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Somethings went wrong=> ERR:' + err
                });
            });
        } else {
            return res.status(400).json({
                Error: 'Can not start, Not enough current employee !'
            });
        }
    }).catch(err => {
        return res.status(500).json({
            Error: 'Project can not find => ERR:' + err
        });
    });

};

exports.finish_project = async (req, res, next) => { // Yusuf (project1)
    let dismisals = [];
    const project = await Project.findOne({
        where: {
            id: req.body.project_id
        }
    });
    if(project.active===false){
        return res.status(500).json({
            Error: 'Project is not active'
        });
    }
    project.update({end_date: new Date(), is_finished: true, active: false,current_emp_num:0}, {where: {id: project.id}});

    const managers = await Manager.findAll();
    const analysts = await Analyst.findAll();
    const designers = await Designer.findAll();
    const m = await Maintenance_worker.findAll();
    const programmers = await Programmer.findAll();
    const testers = await Tester.findAll();
    try {
        await finishProjectForEmployee(managers, project, Manager, dismisals);
        await finishProjectForEmployee(analysts, project, Analyst, dismisals);
        await finishProjectForEmployee(designers, project, Designer, dismisals);
        await finishProjectForEmployee(m, project, Maintenance_worker, dismisals);
        await finishProjectForEmployee(programmers, project, Programmer, dismisals);
        await finishProjectForEmployee(testers, project, Tester, dismisals);
    } catch (e) {
        return res.status(500).json({
            Error: 'finish project error in for => ERR:' + e
        });
    }
    return res.status(200).json({
        Response: dismisals
    });


};

function dismissal_employee(employee,type) {  // Yusuf
    /*if(type ===null){
        // !!!   BASKA SITEDEN ALINACAKSA IF BLOĞU YORUM SATIRI OLMAKTAN CIKARILIR !!!
        const postData = querystring.stringify({
            'msg': 'Hello World!'
        });
        const options = {
            hostname: 'www.google.com',
            port: 80,
            path: '/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(postData);
        req.end();
        return 0;
    }
    */
    return (type+" ID:"+employee.id+" "+employee.name + " "+ employee.surname+ "'s compensation is:" + calculate_compensation(employee.salary));
}

exports.get_specific_employees = async (req, res, next) => {
    const dbObject = await dbFinder(req.body.type);
    dbObject.findAll().then(result => {
        return res.status(200).json({
            Response: result
        });
    }).catch(err => {
        return res.status(500).json({
            Error: 'Somethings went wrong ERR:' + err
        });
    })

};

function dbFinder(EmployeeDepartment) {
    switch (EmployeeDepartment) {
        case "Manager":
            console.log('MANAGER');
            return Manager;
        case "Analyst":
            console.log('ANALYST');
            return Analyst;
        case "Designer":
            console.log('DESIGNER');
            return Designer;
        case "Programmer":
            console.log('PROGRAMMER');
            return Programmer;
        case  "Tester":
            console.log('TESTER');
            return Tester;
        case "Maintenance_worker":
            console.log('MAINTENANCE_WORKER');
            return Maintenance_worker;
        default:
            console.log('NULL !');
            return null;
    }
}

async function getEmployees() {
    let employees = [];
    const managers = await Manager.findAll();
    const analysts = await Analyst.findAll();
    const designers = await Designer.findAll();
    const m = await Maintenance_worker.findAll();
    const programmers = await Programmer.findAll();
    const testers = await Tester.findAll();
    managers.forEach(function (employee) {
        employee.dataValues.type = "Manager";
        employees.push(employee.dataValues);
    });
    analysts.forEach(function (employee) {
        employee.dataValues.type = "Analyst";
        employees.push(employee.dataValues);
    });
    designers.forEach(function (employee) {
        employee.dataValues.type = "Designer";
        employees.push(employee.dataValues);
    });
    m.forEach(function (employee) {
        employee.dataValues.type = "Maintenance Worker";
        employees.push(employee.dataValues);
    });
    programmers.forEach(function (employee) {
        employee.dataValues.type = "Programmer";
        employees.push(employee.dataValues);
    });
    testers.forEach(function (employee) {
        employee.dataValues.type = "Tester";
        employees.push(employee.dataValues);
    });
    return employees;
}

function isWorkInProject(projects, project_id) {
    let returnValue = false;
    if (projects === null) {
        return returnValue;
    }
    projects.forEach(element => {
        if (element === project_id) {
            returnValue = true;
            return returnValue;
        }
    });
    return returnValue;
}

function finishEmployeeProject(projects, project_id) {
    let newProjects = [];
    projects.forEach(element => {
        if (element !== project_id) {
            newProjects.push(element);
        }
    });
    return newProjects;
}

async function finishProjectForEmployee(employees, project, dbObject, dismisals) {
    for (let i = 0; i < employees.length; i++) {
        if (isWorkInProject(employees[i].active_project, project.id)) {
            let employee = null;
            await dbObject.findOne({
                where: {
                    id: employees[i].id,
                }
            }).then(async employee2 => {
                employee = employee2;
            });
            await employee.update({active_project: finishEmployeeProject(employee.active_project, project.id)}, {where: {id: employee.id}});
            console.log(JSON.stringify(employee));
            let isAssign = null;

            if (!(employee.active_project.length > 0)) {
                await Project.findAll().then(async projects => {
                    let can_assign = false;
                    for (let i = 0; i < projects.length; i++) {
                        if (projects[i].current_emp_num < projects[i].max_emp && projects[i].active === true) {
                            can_assign = try_assign(employee, projects[i]);
                            if (can_assign) {
                                let employee_Projects = employee.active_project;
                                employee_Projects.push(projects[i].id);
                                employee.update({active_project: employee_Projects}, {where: {id: employee.id}});
                                projects[i].current_emp_num++;
                                projects[i].update({current_emp_num: projects[i].current_emp_num}, {where: {id: projects[i].id}});
                                break;
                            }
                        }
                    }
                    if (can_assign){
                        dismisals.push(employee.name+" assign to "+projects[i].name+"\n");
                        console.log(employee.name, employee.active_project.name, " e atandı . ");
                    }
                    else
                        await dbObject.destroy({
                            where: {
                                id: employee.id
                            }
                        });
                        console.log(employee.name, "Atanamadı.");

                    isAssign = can_assign;
                });

            } else {
                console.error("Bu kişi zaten atandı.");
                isAssign=  false;
            }
            console.log("isAssign :" + isAssign);
            if (isAssign === false) {
                dismisals.push(dismissal_employee(employee,employee.constructor.name.toString())+"\n");
            }

        }
    }
}

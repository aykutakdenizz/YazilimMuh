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

async function load_all_data() {
    console.log("\n\n!!! 'await Load_all_data()' seklinde cekilmezse gelecek verileri beklemeden fonksiyon sonlanir !!! \n\n");
    const projects = await Project.findAll();
    return projects;

}

async function create_employee(Employee) {
    console.log("Employee Olusturuluyor");
    const type = Employee.type;
    const name = Employee.name;
    const surname = Employee.surname;
    const accounting_type = Employee.accounting_type;
    const experience = Employee.experience;
    const salary = auto_set_salary(Employee);
    console.log(JSON.stringify(Employee));
    switch (type) {
        case "12" : {
            const manager = new Manager({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary
            });
            return await manager.save(manager).then(result => {
                console.log(JSON.stringify(manager) + ' created');
            }).catch(e => {
                console.log(e + ' hatasi manager yaratilamadi.')
            });
        }
        case "13" : {
            const analyst = new Analyst({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary
            });
            return await analyst.save(analyst).then(result => {
                console.log(JSON.stringify(analyst) + ' created');
            }).catch(e => {
                console.log(e + ' hatasi analyst yaratilamadi.')
            });
        }
        case "14" : {
            const designer = new Designer({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary
            });
            return await designer.save(designer).then(result => {
                console.log(JSON.stringify(designer) + ' created');
            }).catch(e => {
                console.log(e + ' hatasi designer yaratilamadi.')
            });
        }
        case "15" : {
            const programmer = new Programmer({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary
            });
            return await programmer.save(programmer).then(result => {
                console.log(JSON.stringify(programmer) + ' created');
            }).catch(e => {
                console.log(e + ' hatasi programmer yaratilamadi.')
            });
        }
        case "16" : {
            const tester = new Tester({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary
            });
            return await tester.save(tester).then(result => {
                console.log(JSON.stringify(tester) + ' created');
            }).catch(e => {
                console.log(e + ' hatasi tester yaratilamadi.')
            });
        }
        case "17" : {
            const maintenance_worker = new Maintenance_worker({
                name: name,
                surname: surname,
                accounting_type: accounting_type,
                experience: experience,
                salary: salary
            });
            return await maintenance_worker.save(maintenance_worker).then(result => {
                console.log(JSON.stringify(maintenance_worker) + ' created');
            }).catch(e => {
                console.log(e + ' hatasi maintenance_worker yaratilamadi.')
            });
        }
        default : {
            console.error("Type of employee can not detect . Please check code ");
        }
    }
}

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

async function assign_emp_to_project(Employee) { // Faz
    const db = await dbFinder(Employee.type);
    console.log(db);
    db.findOne({
        where: {
            id: Employee.id,
        }
    }).then(async employee => {
        if (employee.active_project === null) {
            await Project.findAll().then(projects => {
                let can_assign;
                for (let i = 0; i < projects.length; i++) {
                    if (projects[i].current_emp_num < projects[i].max_emp) {
                        can_assign = try_assign(employee, projects[i]);
                        if (can_assign) {
                            employee.active_project = projects[i];
                            projects[i].current_emp_num++;
                            projects[i].update({current_emp_num: projects[i].current_emp_num}, {where: {id: projects[i].id}});
                            break;
                        }
                    }
                }
                if (can_assign)
                    console.log(employee.name, employee.active_project.name, " e atandı . ");
                else
                    console.log(employee.name, "Atanamadı.");
                return can_assign;
            });

        } else {
            console.error("Bu kişi zaten atandı.");
            return false;
        }
    }).catch(err => {
        console.log('Employee catch in assigment ERROR is:' + err)
    });
}

function calculate_compensation(employee) { // Yusuf
    // This function can be customized .
    return employee.salary * 8.72
}

async function auto_set_salary(employee) { // Faz
    if (employee.accounting_type === 0) {
        switch (employee.constructor.name) {
            case "Manager":
                employee.salary = 11025;
                Manager.update({salary: employee.salary}, {where: {id: employee.id}});
                break;
            case "Analyst":
                employee.salary = 8127;
                Analyst.update({salary: employee.salary}, {where: {id: employee.id}});
                break;
            case "Designer":
                employee.salary = 7543;
                Designer.update({salary: employee.salary}, {where: {id: employee.id}});
                break;
            case "Programmer":
                employee.salary = 7512;
                Programmer.update({salary: employee.salary}, {where: {id: employee.id}});
                break;
            case  "Tester":
                employee.salary = 5000;
                Tester.update({salary: employee.salary}, {where: {id: employee.id}});
                break;
            case "Maintenance_worker":
                employee.salary = 6999;
                Maintenance_worker.update({salary: employee.salary}, {where: {id: employee.id}});
                break;
        }
    } else {
        const db = await dbFinder(employee.constructor.name.toString());
        console.log(db);
        db.findOne({
            where: {
                id: employee.id,
            }
        }).then(async employee => {
            employee.salary = employee.experience * 800;
            employee.update({salary: employee.salary}, {where: {id: employee.id}});
        });
    }
    console.log(employee.name, "İçin ayarlanmış maaş ", employee.salary)
}

function create_project(newProject) { // Yusuf
    const project = new Project({
        name: newProject.name,
        despriction: newProject.despriction,
        min_emp: newProject.min_emp,
        max_emp: newProject.max_emp,
        max_analyst: newProject.max_analyst,
        max_designer: newProject.max_designer,
        max_programmer: newProject.max_programmer,
        max_tester: newProject.max_tester,
        max_maintenance: newProject.max_maintenance
    });
    project.save();
}


async function load_projects() { // Aykut
    const projects = await Project.findAll();
    return projects;
}

async function load_employees() { // Aykut
    const employees = await getEmployees();
    return employees;
}

function get_infos() { // Aykut
    // last idleri ayarla
}

function start_project(project) { // Faz
    if (project.current_emp_num > project.min_emp) {
        Project.update({active:true,start_date:new Date()},{where:{id:project.id}});
    } else {
        // GUI İŞİ VAR UYAR ADAMI
        console.error("Proje gereklilikleri sağlamıyor başlayamaz")
    }
}

async function finish_project(project1) { // Yusuf
    const project = await Project.findOne({where:{id:project1.id}});
    project.update({end_date: new Date(),is_finished: true}, {where: {id: project.id}});

    let employees = await getEmployees();
    console.log(JSON.stringify(employees));
    for (let i = 0; i < employees.length; i++) {
        console.log(employees[i]);//TODO active project sutunu integer array olacak
        if (employees[i].active_project !== null && employees[i].active_project.id === project.id) {
            let db = await dbFinder(employees[i].constructor.name.toString());
            db.findOne({
                where: {
                    id: employees[i].id,
                }
            }).then(async employee => {
                employee.update({active_project: null}, {where: {id: employee.id}});
            });
            if (!await assign_emp_to_project(employees[i])) {
                dismissal_employee(employees[i]);
            }
        }
    }

}

async function show_employees() { // Yusuf
    console.log(JSON.stringify(await getEmployees()));
}

async function show_projects() { // Yusuf
    console.log(JSON.stringify(await Project.findAll()));
}

function dismissal_employee(employee) {  // Yusuf
    //employees = employees.filter(item => item !== employee)
    //Tazminat şeysini yap akjdalskas
    //compensation = calculate_compensation(employee)
    console.log(employee.name, "İçin hesaplanan tazminat tutarı  ", compensation)
    //GUIYE EKLE
}

async function get_All_managers() {
    const managers = await Manager.findAll();
    return managers;
}

function dbFinder(EmployeeDepartment) {
    console.log(EmployeeDepartment);

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

async function getEmployees(){
    let employees = [];
    const managers = await Manager.findAll();
    const analysts = await Analyst.findAll();
    const designers = await Designer.findAll();
    const m = await Maintenance_worker.findAll();
    const programmers = await Programmer.findAll();
    const testers = await Tester.findAll();
    managers.forEach(function(employee) {
        employees.push(employee.dataValues);
    });
    analysts.forEach(function(employee) {
        employees.push(employee.dataValues);
    });
    designers.forEach(function(employee) {
        employees.push(employee.dataValues);
    });
    m.forEach(function(employee) {
        employees.push(employee.dataValues);
    });
    programmers.forEach(function(employee) {
        employees.push(employee.dataValues);
    });
    testers.forEach(function(employee) {
        employees.push(employee.dataValues);
    });
    return  employees;
}

module.exports = {
    add_listeners,
    load_all_data,
    create_employee,
    assign_emp_to_project,
    try_assign,
    calculate_compensation,
    auto_set_salary,
    create_project,
    load_projects,
    load_employees,
    get_infos,
    start_project,
    finish_project,
    show_employees,
    show_projects,
    dismissal_employee,
    get_All_managers,
    dbFinder,
    getEmployees
};
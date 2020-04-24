export function load_all_data() {
    return async dispatch => {
        let projects = [];
        await fetch('http://localhost:8000/load_all_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            const s = resData.Response;
            for (let i = 0; i < s.length; i++) {
                let project = s[i];
                projects.push(project);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "load_all_data",
            payload: projects
        });
    };
}

export function create_employee(employee) {
    return async dispatch => {
        let newEmployee = null;
        await fetch('http://localhost:8000/create_employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            newEmployee = resData.Response;
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "create_employee",
            payload: {
                NewEmployee: newEmployee,
                Type: employee.type
            }
        });
    };
}

export function assign_emp_to_project(reqbody) {
    return async dispatch => {
        let response = null;
        await fetch('http://localhost:8000/assign_emp_to_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqbody)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            response = resData.Response;
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "assign_emp_to_project",
            payload: response
        });
    };
}

export function create_project(project, projects) {
    return async dispatch => {
        let newProjects = [];
        await fetch('http://localhost:8000/create_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            projects.forEach(aProject => {
                newProjects.push(aProject);
            });
            newProjects.push(resData.Response)
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "create_project",
            payload: newProjects
        });
    };
}

export function load_projects() {
    return async dispatch => {
        let projects = [];
        await fetch('http://localhost:8000/load_projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            const s = resData.Response;
            for (let i = 0; i < s.length; i++) {
                let project = s[i];
                projects.push(project);
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "load_projects",
            payload: projects
        });
    };
}

export function start_project(reqBody, projects) {
    return async dispatch => {
        let response = null;
        let newProjects = [];
        projects.forEach(aProject => {
            newProjects.push(aProject)
        });
        await fetch('http://localhost:8000/start_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            if (resData.Response === 1) {
                response = true;
            } else {
                response = false;
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "start_project",
            payload: {
                Projects: newProjects,
                Response: response
            }
        });
    };
}

export function finish_project(reqBody) {
    return async dispatch => {
        let response = null;
        await fetch('http://localhost:8000/finish_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                //response= res.body;
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            response = resData.Response;
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "finish_project",
            payload: response
        });
    };
}

export function load_employees() {
    return async dispatch => {
        let employees = [];
        await fetch('http://localhost:8000/load_employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            const s = resData.Response;
            for (let i = 0; i < s.length; i++) {
                let employee = s[i];
                employees.push(employee);
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "load_employees",
            payload: employees
        });
    };
}

export function get_specific_employees(reqBody) {
    return async dispatch => {
        let employees = [];
        await fetch('http://localhost:8000/get_specific_employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            if (resData.Response !== null) {
                resData.Response.forEach(e => {
                    employees.push(e);
                });
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "get_specific_employees",
            payload: {
                Type: reqBody.type,
                Employees: employees
            }
        });
    };
}
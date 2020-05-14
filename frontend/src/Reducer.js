const initialReducer = {
    Projects: [],
    Managers: [],
    Analysts: [],
    Designers: [],
    Maintenance_workers: [],
    Programmers: [],
    Testers: [],
    Employees: [],
    SelectedProject: null,
    SelectedEmployee: null,
    Response: "NO",
    Error:false,
    Show:false,
};

const Reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case "load_projects":
            state = {
                ...state,
                Projects: action.payload
            };
            break;
        case "start_project":
            state = {
                ...state,
                Response: action.payload.Response,
                Projects: action.payload.Projects,
                Error: action.payload.Error
            };
            break;
        case "finish_project":
            state = {
                ...state,
                Response: action.payload.Response,
                Error: action.payload.Error,
                Show: action.payload.Show
            };
            break;
        case "get_specific_employees":
            if (action.payload.Type === "Manager") {
                state = {
                    ...state,
                    Managers: action.payload.Employees
                };
            } else if (action.payload.Type === "Analyst") {
                state = {
                    ...state,
                    Analysts: action.payload.Employees
                };
            }else if (action.payload.Type === "Designer") {
                state = {
                    ...state,
                    Designers: action.payload.Employees
                };
            }else if (action.payload.Type === "Programmer") {
                state = {
                    ...state,
                    Programmers: action.payload.Employees
                };
            }else if (action.payload.Type === "Tester") {
                state = {
                    ...state,
                    Testers: action.payload.Employees
                };
            }else if (action.payload.Type === "Maintenance_worker") {
                state = {
                    ...state,
                    Maintenance_workers: action.payload.Employees
                };
            }
            break;
        case "load_employees":
            state = {
                ...state,
                Employees: action.payload
            };
            break;
        case "set_error_false":
            state = {
                ...state,
                Error: action.payload
            };
            break;
        case "set_show_false":
            state = {
                ...state,
                Show: action.payload
            };
            break;
        case "create_project":
            state = {
                ...state,
                Projects: action.payload.Projects,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "assign_emp_to_project":
            state = {
                ...state,
                Response: action.payload.Response,
                Show: action.payload.Show,
                Error: action.payload.Error
            };
            break;
        case "create_employee":
            state = {
                ...state,
                Response: action.payload.Response,
                Show: action.payload.Show,
                Error: action.payload.Error
            };
            break;
        default:
            break;
    }
    return state;
};
export default Reducer;


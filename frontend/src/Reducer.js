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
    Response: null,
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
                Response: action.payload
            };
            break;
        case "finish_project":
            state = {
                ...state,
                Response: action.payload
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
        case "FIND_BUS":
            state = {
                ...state,
                FindBus: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default Reducer;


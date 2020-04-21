import React, {Component} from 'react';

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//const { load_projects} = require('../../../Controller/Controllers');
//let projects = [];

class Project extends Component {

    loadProjects = async () => {
        const list = [{},{}];//await load_projects();
        return list;
    };

    render() {
        const projectList = this.loadProjects().map(project => {
                return (
                    <tr key={project.Id} className="event__list-item">
                        <td>{project.manager_id}</td>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.min_emp}</td>
                        <td>{project.max_emp}</td>
                        <td>{project.start_date}</td>
                        <td>{project.end_date}</td>
                        <td>{project.is_finished}</td>
                        <td>{project.active}</td>
                        <td>{project.max_analyst}</td>
                        <td>{project.max_designer}</td>
                        <td>{project.max_programmer}</td>
                        <td>{project.max_tester}</td>
                        <td>{project.max_maintenance}</td>
                        <td>{project.current_emp_num}</td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Manager</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Min emp</th><th>Max emp</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Finished</th>
                        <th>Active</th>
                        <th>Max Analyst</th>
                        <th>Max Designer</th>
                        <th>Max Programmer</th>
                        <th>Max Tester</th>
                        <th>Max Maintenance</th>
                        <th>Current Employee</th>
                    </tr>
                    </thead>
                    <tbody>{projectList}</tbody>
                </Table>
            </React.Fragment>
        );

    }
}

export default Project;


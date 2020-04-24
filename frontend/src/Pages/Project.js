import React, {Component} from 'react';

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {connect} from "react-redux";

import {finish_project, load_projects, start_project} from "../Actions";

import './Projects.css'
import Card from "react-bootstrap/Card";

class Project extends Component {

    componentDidMount() {
        this.props.load_projects();
    }////////////

    render() {
        const projectList = this.props.reducer.Projects.map(project => {
                return (
                    <tr key={project.id} className="event__list-item">
                        <td>{project.manager_id}</td>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.min_emp}</td>
                        <td>{project.max_emp}</td>
                        <td>{project.start_date}</td>
                        <td>{project.end_date}</td>
                        <td>{project.current_emp_num}</td>
                        <td>
                            <ButtonGroup vertical>
                                <Button variant="success" onClick={() => {
                                    this.props.start_project({project_id: project.id}, this.props.reducer.Projects);
                                    this.props.load_projects();
                                }}>Start</Button>
                                <Button variant="danger" onClick={() => {
                                    this.props.finish_project({project_id: project.id});
                                    this.props.load_projects();
                                }}>Finish</Button>
                            </ButtonGroup>
                        </td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Card>
                    <Card.Body>
                        <Table responsive striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>Manager ID</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Min Emp</th>
                                <th>Max Emp</th>
                                <th>Start Time</th>
                                <th>Finish Time</th>
                                <th>Current Employee</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projectList}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        reducer: state.reducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        load_projects: () => {
            dispatch(load_projects());
        },
        start_project: (body, projects) => {
            dispatch(start_project(body, projects));
        },
        finish_project: (body) => {
            dispatch(finish_project(body));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

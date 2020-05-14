import React, {Component} from 'react';

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {connect} from "react-redux";

import {
    create_project,
    finish_project,
    load_projects,
    set_error_false,
    set_show_false,
    start_project
} from "../Actions";

import './Projects.css'
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false
        };
        this.ProjectManagerIdElement = React.createRef();
        this.ProjectNameElement = React.createRef();
        this.ProjectDescriptionElement = React.createRef();
        this.ProjectMinEmpElement = React.createRef();
        this.ProjectMaxEmpElement = React.createRef();
        this.ProjectAnalystElement = React.createRef();
        this.ProjectDesignerElement = React.createRef();
        this.ProjectProgrammerElement = React.createRef();
        this.ProjectTesterElement = React.createRef();
        this.ProjectMaintenanceWorkerElement = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const project = {
            manager_id: (this.ProjectManagerIdElement.current.value === "") ? (0) : (this.ProjectManagerIdElement.current.value),
            name: (this.ProjectNameElement.current.value === "") ? ("ProjectName") : (this.ProjectNameElement.current.value),
            despriction: (this.ProjectDescriptionElement.current.value === "") ? ("Description") : (this.ProjectDescriptionElement.current.value),
            min_emp: (this.ProjectMinEmpElement.current.value === "") ? (0) : (this.ProjectMinEmpElement.current.value),
            max_emp: (this.ProjectMaxEmpElement.current.value === "") ? (5) : (this.ProjectMaxEmpElement.current.value),
            max_analyst: (this.ProjectAnalystElement.current.value === "") ? (1) : (this.ProjectAnalystElement.current.value),
            max_designer: (this.ProjectDesignerElement.current.value === "") ? (1) : (this.ProjectDesignerElement.current.value),
            max_programmer: (this.ProjectProgrammerElement.current.value === "") ? (1) : (this.ProjectProgrammerElement.current.value),
            max_tester: (this.ProjectTesterElement.current.value === "") ? (1) : (this.ProjectTesterElement.current.value),
            max_maintenance: (this.ProjectMaintenanceWorkerElement.current.value === "") ? (1) : (this.ProjectMaintenanceWorkerElement.current.value),
        };
        this.setState({create: false});
        await this.props.create_project(project,this.props.reducer.Projects);
    };
    componentDidMount() {
        this.props.load_projects();
    }

    render() {
        const projectList = this.props.reducer.Projects.map(project => {
                return (
                    <tr key={project.id} className="event__list-item">
                        <td>{project.manager_id}</td>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.despriction}</td>
                        <td>{project.min_emp}</td>
                        <td>{project.max_emp}</td>
                        <td>{project.start_date}</td>
                        <td>{project.end_date}</td>
                        <td>{project.current_emp_num}</td>
                        <td>
                            <ButtonGroup vertical>
                                <Button variant="success" onClick={() => {
                                    this.props.start_project({project_id: project.id}, this.props.reducer.Projects);
                                }}>Start</Button>
                                <Button variant="danger" onClick={() => {
                                    this.props.finish_project({project_id: project.id});
                                }}>Finish</Button>
                            </ButtonGroup>
                        </td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Modal show={this.props.reducer.Error}>
                    <Modal.Header closeButton onClick={this.props.set_error_false}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.reducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.set_error_false}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.reducer.Show}>
                    <Modal.Header closeButton onClick={this.props.set_show_false}>
                        <Modal.Title>Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.reducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.set_show_false}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={ this.state.create}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({create: false});
                    }}>
                        <Modal.Title>Project Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Create a project</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Manager ID</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Manager ID"
                                                                  ref={this.ProjectManagerIdElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Project Name</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Project Name"
                                                                  ref={this.ProjectNameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Project Description</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Project Description"
                                                                  ref={this.ProjectDescriptionElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Min Employee</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Min Employee"
                                                                  ref={this.ProjectMinEmpElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Max Employee</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Min Employee"
                                                                  ref={this.ProjectMaxEmpElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Max Analyst</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Analyst"
                                                                  ref={this.ProjectAnalystElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Max Designer</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Designer"
                                                                  ref={this.ProjectDesignerElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Max Programmer</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Programmer"
                                                                  ref={this.ProjectProgrammerElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Max Tester</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Tester"
                                                                  ref={this.ProjectTesterElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Max Maintenance Worker</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Number of Maintenance Worker"
                                                                  ref={this.ProjectMaintenanceWorkerElement}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Button variant="primary" type="submit">
                                                Create
                                            </Button>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </Modal>

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
                <ButtonGroup>
                    <Button variant="primary" onClick={this.props.load_projects}>
                        Refresh
                    </Button>
                    <Button variant="success" onClick = {()=>{this.setState({create: true});}}>
                        Create New Project
                    </Button>
                </ButtonGroup>
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
        },
        set_error_false: () => {
            dispatch(set_error_false());
        },
        set_show_false: () => {
            dispatch(set_show_false());
        },
        create_project:(p,ps) => {
            dispatch(create_project(p,ps));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

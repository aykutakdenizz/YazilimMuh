import React, {Component} from 'react';
import "./MainPage.css";
import {
    create_employee,
    assign_emp_to_project, set_error_false, set_show_false
} from "../Actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false,
            assign: false,
        };
        this.EmployeeNameElement = React.createRef();
        this.EmployeeSurnameElement = React.createRef();
        this.EmployeeAccountingTypeElement = React.createRef();
        this.EmployeeExperienceElement = React.createRef();
        this.EmployeeProfessionElement = React.createRef();
        this.AssignEmpIdElement = React.createRef();
        this.AssignTypeElement = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const employee = {
            name: (this.EmployeeNameElement.current.value === "") ? ("Empty Name") : (this.EmployeeNameElement.current.value),
            surname: (this.EmployeeSurnameElement.current.value === "") ? ("Empty Surname") : (this.EmployeeSurnameElement.current.value),
            accounting_type: (this.EmployeeAccountingTypeElement.current.value === "1") ? (1) : (0),
            experience: (this.EmployeeExperienceElement.current.value === "") ? (0) : (this.EmployeeExperienceElement.current.value),
            type: (this.EmployeeProfessionElement.current.value === "") ? ("Maintenance Worker") : (this.EmployeeProfessionElement.current.value),
        };
        this.props.create_employee(employee);
        this.setState({create: false});
    };

    submitHandlerAssign = async (event) => {
        event.preventDefault();
        const employee = {
            type: (this.AssignTypeElement.current.value === "") ? (null) : (this.AssignTypeElement.current.value),
            employee_id: (this.AssignEmpIdElement.current.value === "") ? (null) : (this.AssignEmpIdElement.current.value),
        };
        this.props.assign_emp_to_project(employee);
        this.setState({assign: false});
    };

    render() {
        return (
            <React.Fragment>
                <h1>Welcome Home</h1>

                <ButtonGroup>
                    <Button variant="success" onClick={() => {
                        this.setState({create: true});
                    }}>
                        Create New Employee
                    </Button>
                    <Button variant="warning" onClick={() => {
                        this.setState({assign: true});
                    }}>
                        Assign Employee to Project
                    </Button>
                </ButtonGroup>

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
                    <Modal.Header closeButton onClick={this.props.set_error_false}>
                        <Modal.Title>Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.reducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.set_show_false}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.create}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({create: false});
                    }}>
                        <Modal.Title>Employee Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Create a employee</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Employee Name</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Name"
                                                                  ref={this.EmployeeNameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Employee Surname</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Surname"
                                                                  ref={this.EmployeeSurnameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicIsActive">
                                                    <Form.Label>Accounting Type: (Regular Experience)</Form.Label>
                                                    <Form.Control type="range" min="0" max="1" placeholder="acctype"
                                                                  ref={this.EmployeeAccountingTypeElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Experience</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter Year of Experience"
                                                                  ref={this.EmployeeExperienceElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Example select</Form.Label>
                                                    <Form.Control as="select" ref={this.EmployeeProfessionElement}>
                                                        <option>Manager</option>
                                                        <option>Analyst</option>
                                                        <option>Designer</option>
                                                        <option>Maintenance Worker</option>
                                                        <option>Programmer</option>
                                                        <option>Tester</option>
                                                    </Form.Control>
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


                <Modal show={this.state.assign}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({assign: false});
                    }}>
                        <Modal.Title>Employee Assign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Assign a employee</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandlerAssign}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Example select</Form.Label>
                                                    <Form.Control as="select" ref={this.AssignTypeElement}>
                                                        <option>Manager</option>
                                                        <option>Analyst</option>
                                                        <option>Designer</option>
                                                        <option>Maintenance_worker</option>
                                                        <option>Programmer</option>
                                                        <option>Tester</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Employee ID</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter ID of Employee"
                                                                  ref={this.AssignEmpIdElement}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Button variant="primary" type="submit">
                                                Assign
                                            </Button>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </Modal>


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
        create_employee: (employee) => {
            dispatch(create_employee(employee));
        },
        assign_emp_to_project: (reqBody) => {
            dispatch(assign_emp_to_project(reqBody))
        },
        set_error_false: () => {
            dispatch(set_error_false());
        },
        set_show_false: () => {
            dispatch(set_show_false());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


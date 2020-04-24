import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";

import {load_employees} from "../../Actions";

//import './Projects.css';


class AllEmployees extends Component {

    componentDidMount() {
        this.props.load_employees();
    }

    render() {
        let list = null;
        if (this.props.reducer.Employees !== null) {
            list = this.props.reducer.Employees.map(obj => {
                    return (
                        <tr key={obj.id} className="event__list-item">
                            <td>{obj.type}</td>
                            <td>{obj.id}</td>
                            <td>{obj.name}</td>
                            <td>{obj.surname}</td>
                            <td>{obj.active_project}</td>
                            <td>{obj.accounting_type}</td>
                            <td>{obj.salary}</td>
                            <td>{obj.experience}</td>
                        </tr>
                    )
                }
            );
        }
        return (
            <React.Fragment>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Profession</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Projects</th>
                        <th>Accounting Type</th>
                        <th>Salary</th>
                        <th>Experience</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </Table>
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
        load_employees: () => {
            dispatch(load_employees());
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployees);

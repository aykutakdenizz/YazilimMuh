import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";

import {get_specific_employees} from "../../Actions";
import Card from "react-bootstrap/Card";

//import './Projects.css';


class Analyst extends Component {

    componentDidMount() {
        this.props.get_specific_employees({type: "Analyst"});
    }

    render() {
        let list = null;
        if (this.props.reducer.Analysts !== null) {
            list = this.props.reducer.Analysts.map(obj => {
                    return (
                        <tr key={obj.id} className="event__list-item">
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
                <Card>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                            <tr>
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
        get_specific_employees: (type) => {
            dispatch(get_specific_employees(type));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analyst);

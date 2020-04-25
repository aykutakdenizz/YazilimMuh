import React from 'react';
import {NavLink} from 'react-router-dom';

import './Navigation.css';
import Navbar from "react-bootstrap/Navbar";


const Navigation = props => (
    <header className="main-navigation">
        <div className="main-navigation_logo">
            <Navbar>
                <Navbar.Brand href="/MainPage">
                    <h1 className="main-navigation_logo_name">SYSTEM</h1>
                </Navbar.Brand>
            </Navbar>
        </div>
        <nav className="main-navigation_items">
            <ul>
                <li><NavLink to="/Project">Project</NavLink></li>
                <li><NavLink to="/Analyst">Analyst</NavLink></li>
                <li><NavLink to="/Designer">Designer</NavLink></li>
                <li><NavLink to="/MaintenanceWorker">Maintenance Worker</NavLink></li>
                <li><NavLink to="/Manager">Manager</NavLink></li>
                <li><NavLink to="/Programmer">Programmer</NavLink></li>
                <li><NavLink to="/Tester">Tester</NavLink></li>
                <li><NavLink to="/AllEmployee">All Employees</NavLink></li>
            </ul>
        </nav>
    </header>

);

export default Navigation;
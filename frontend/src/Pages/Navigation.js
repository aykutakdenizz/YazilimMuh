import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';


const Navigation = props =>(
    <header className="main-navigation">
        <div className="main-navigation_logo">
            <NavLink to="/MainPage"><h1>SYSTEM</h1></NavLink>
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
import React from 'react';
import {Switch} from "react-bootstrap";
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from "./Pages/MainPage";
import Navigation from './Pages/Navigation';
import Project from "./Pages/Project";
import Manager from "./Pages/Empolyees/Manager";
import Analyst from "./Pages/Empolyees/Analyst";
import Designer from "./Pages/Empolyees/Designer";
import Maintenance_worker from "./Pages/Empolyees/Maintenance_worker";
import Programmer from "./Pages/Empolyees/Programmer";
import Tester from "./Pages/Empolyees/Tester";
import AllEmployees from "./Pages/Empolyees/AllEmployees";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Navigation/>
                    <main className="main-content">
                        <Switch>
                            <Route path="/" component={null}/>
                            <Route path="/MainPage" component={MainPage}/>
                            <Route path="/Project" component={Project}/>
                            <Route path="/Manager" component={Manager}/>
                            <Route path="/Analyst" component={Analyst}/>
                            <Route path="/Designer" component={Designer}/>
                            <Route path="/MaintenanceWorker" component={Maintenance_worker}/>
                            <Route path="/Programmer" component={Programmer}/>
                            <Route path="/Tester" component={Tester}/>
                            <Route path="/AllEmployee" component={AllEmployees}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        );
    }


}

export default App;

import React from 'react';
import {Switch} from "react-bootstrap";
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import MainPage from "./Pages/MainPage";
import Navigation from './Pages/Navigation';
import Project from "./Pages/Project";

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
                        </Switch>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        );
    }


}

export default App;

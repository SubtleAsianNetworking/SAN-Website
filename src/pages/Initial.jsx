import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import AddEvent from './AddEvent/AddEvent';
import GetEvents from './GetEvents/GetEvents';

import "bootstrap/dist/css/bootstrap.min.css";

export default class Initial extends Component {
    render() {
        return (
            <div className="wrapper">
                <Router>
                    <div className="content">
                        <Switch>
                            {/* Accessible to All */}
                            <Route path="/" exact component={Home} />
                            <Route path="/events/" exact component={GetEvents} />
                            <Route path="/events/add" exact component={AddEvent} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
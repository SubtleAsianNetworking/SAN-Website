import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import AddEvent from './AddEvent/AddEvent';

export default class Initial extends Component {
    render() {
        return (
            <div className="wrapper">
                <Router>
                    <div className="content">
                        <Switch>
                            {/* Accessible to All */}
                            <Route path="/" exact component={Home} />
                            <Route path="/add-event" exact component={AddEvent} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
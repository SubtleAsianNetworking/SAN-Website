import React from 'react';
import './Home.css';

export default class Home extends React.Component {

    render() {
        return (
          <div className="page-home">
            <div> Hello there. You're in the home page. </div>
            <div> <a href="events/add">Click here to add an event.</a></div>
          </div>
        );
    }
}
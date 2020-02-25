import React from 'react';
import './AddEvent.css';

export default class AddEvent extends React.Component {
    render() {
        return (
          <div className="page-add-event">
            <div> Hello there. You're now in the add event page.  </div>
            <div> <a href="/">Would you like to go back to the homepage?</a> </div>
          </div>
        );
    }
}
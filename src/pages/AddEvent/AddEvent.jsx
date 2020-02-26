import React from 'react';
import axios from 'axios';
import DateTime from 'react-datetime';
import moment from 'moment';

import './AddEvent.css';

export default class AddEvent extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      formData: {
        time: '',
        location: '',
        topic: '',
        affliation: '',
      },
      errors: [],
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const validation = this.validate();

    const { errors } = validation;

    if (errors.length > 0) {
        window.scrollTo(0, 0);
        this.setState({
          ...this.state,
          errors: errors,
      });
      return
    }

    const newEvent = {
        ...this.state.formData,
        approved: false,
    }

    axios.post('http://localhost:4000/events/add', newEvent)
        .then(res => console.log(res.data));

    this.props.history.push('/events');
 }

  // Check that the entries in the form are valid.
  validate() {
    const requireds = [
      { id: 'time', label: 'The date and time of the event' },
      { id: 'location', label: 'The location of the event' },
      { id: 'topic', label: 'The topic of the event' },
      { id: 'affliation', label: 'Your affliation to the event' },
    ];

    const errors = [];
    requireds.forEach(d => {
      if (!this.state.formData[d.id]) {
          errors.push(`${d.label} is required.`);
      }
    });

    const valid = moment(this.state.formData.time, moment.ISO_8601, true).isValid();
    if (!valid) errors.push('The date and time of the event must be valid.')

    return {
      valid: errors.length === 0,
      errors,
  };
  }

  render() {

    const { errors } = this.state;

      return (
        <div className="container" style={{marginTop: 20}}>
          <div> Hello there. You're now in the add event page.  </div>
          <div> <a href="/">Would you like to go back to the homepage?</a> </div>
          
          <h3>Add an Event</h3>

          {(errors.length > 0) && <div className="error">{errors[0]}</div>}
               
          <form onSubmit={this.onSubmit}>
            <div className="form-group" id="time">
                <label>Time: </label>
                <DateTime value = {this.state.time}
                          onChange={( entry ) => this.setState({
                            formData: {
                                ...this.state.formData,
                                time: entry || null
                            }
                        })}/>
            </div>
            
            <div className="form-group" id="location">
                <label>Location: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.location}
                        onChange={({ target }) => this.setState({
                          formData: {
                              ...this.state.formData,
                              location: target.value || null
                          }
                      })}
                  />
            </div>
            
            <div className="form-group" id="topic">
                <label>Topic: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.topic}
                        onChange={({ target }) => this.setState({
                          formData: {
                              ...this.state.formData,
                              topic: target.value || null
                          }
                      })}
                  />
            </div>

            <div className="form-group" id="affliation">
                <label>Affliation: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.affliation}
                        onChange={({ target }) => this.setState({
                          formData: {
                              ...this.state.formData,
                              affliation: target.value || null
                          }
                      })}
                  />
            </div>

            <div className="form-group">
                <input type="submit" value="Create New Event" className="btn btn-primary" />
            </div>
          </form>

        </div>
      );
  }
}
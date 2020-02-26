import React from 'react';
import axios from 'axios';
import './AddEvent.css';

export default class AddEvent extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        datetime: '',
        location: '',
    }
  }
  
  onChangeDateTime(e) {
    this.setState({
        datetime: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
        location: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newEvent = {
        datetime: this.state.datetime,
        location: this.state.location,
    }
    console.log(newEvent);

    axios.post('http://localhost:4000/events/add', newEvent)
        .then(res => console.log(res.data));

    this.setState({
        datetime: '',
        location: '',
    });

    this.props.history.push('/events');
 }

  render() {
      return (
        <div className="container" style={{marginTop: 20}}>
          <div> Hello there. You're now in the add event page.  </div>
          <div> <a href="/">Would you like to go back to the homepage?</a> </div>
          
          <h3>Add an Event</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Datetime: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.datetime}
                        onChange={this.onChangeDateTime}
                        />
            </div>
            <div className="form-group">
                <label>Description: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeLocation}
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
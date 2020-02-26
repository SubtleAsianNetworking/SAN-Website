import React from 'react';
import axios from 'axios';
import DateTime from 'react-datetime';

import './AddEvent.css';

export default class AddEvent extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeAffliation = this.onChangeAffliation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        time: new Date(),
        location: '',
        topic: '',
        affliation: '',
    }
  }
  
  onChangeTime(e) {
    this.setState({
        time: e
    });
  }

  onChangeLocation(e) {
    this.setState({
        location: e.target.value
    });
  }

  onChangeTopic(e) {
    this.setState({
        topic: e.target.value
    });
  }

  onChangeAffliation(e) {
    this.setState({
        affliation: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.time);

    const newEvent = {
        time: this.state.time,
        location: this.state.location,
        topic: this.state.topic,
        affliation: this.state.affliation,
        approved: false,
    }

    axios.post('http://localhost:4000/events/add', newEvent)
        .then(res => console.log(res.data));

    this.setState({
        time: new Date(),
        location: '',
        topic: '',
        affliation: '',
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
                <label>Time: </label>
                <DateTime value = {this.state.time}
                          onChange = {this.onChangeTime}/>
            </div>
            
            <div className="form-group">
                <label>Location: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.location}
                        onChange={this.onChangeLocation}
                        />
            </div>
            
            <div className="form-group">
                <label>Topic: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.topic}
                        onChange={this.onChangeTopic}
                        />
            </div>

            <div className="form-group">
                <label>Affliation: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.affliation}
                        onChange={this.onChangeAffliation}
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
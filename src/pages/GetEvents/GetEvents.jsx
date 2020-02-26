import React, {Component} from 'react';
import axios from 'axios';

const Event = props => (
    <tr>
        <td>{props.event.date}</td>
        <td>{props.event.time}</td>
        <td>{props.event.location}</td>
        <td>{props.event.topic}</td>
        <td>{props.event.affliation}</td>
    </tr>
)

export default class GetEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/events/')
            .then(response => {
                this.setState({events: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getEventList() {
        return this.state.events.map(function(currEvent, i) {
            const time = new Date (currEvent.time);
            currEvent.date = time.toDateString();
            currEvent.time = time.toLocaleTimeString().replace(/:\d+ /, ' ');
            return <Event event={currEvent} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Events List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Topic</th>
                            <th>Affliation</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getEventList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
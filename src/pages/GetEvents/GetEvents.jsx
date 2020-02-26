import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Event = props => (
    <tr>
        <td>{props.event.datetime}</td>
        <td>{props.event.location}</td>
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
                            <th>Date/Time</th>
                            <th>Location</th>
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
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';

export default class WorkoutIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: []
        }
    }

    componentDidMount() {
        this.fetchWorkouts()
    }

    fetchWorkouts = () => {
        fetch('http://localhost:3000/api/getall', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(res => res.json())
            .then(logdata => {
                return this.setState({ workouts: logdata })
            })
    }

    workoutDelete = (event) => {
        fetch(`http://localhost:3000/api/delete/${event.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify({ log: event.target.id })
        })
        .then(res => this.fetchWorkouts())
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md='3'>
                        <WorkoutCreate token={this.props.token} updateWorkoutsArray={this.fetchWorkouts} />
                    </Col>
                    <Col md='3'>
                        <h2>Log a workout to see table this will be added in the upcoming mods</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}


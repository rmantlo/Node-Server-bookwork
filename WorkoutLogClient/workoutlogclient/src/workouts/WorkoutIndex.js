import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';
import { AuthContext } from '../auth/AuthContext';

class WorkoutIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            updatePressed: false,
            workoutToUpdate: {}
        }
    }

    componentDidMount() {
        this.fetchWorkouts()
        //console.log(this.props)
        //console.log(this.props.auth.sessionToken)
    }

    fetchWorkouts = () => {
        fetch('http://localhost:3000/api/getall', {
            method: 'GET',
            headers: new Headers({
                "Content-Type": 'application/json',
                "Authorization": this.props.auth.sessionToken
            })
        })
            .then(res => res.json())
            .then(logdata => {
                return this.setState({ workouts: logdata })
            })
    }

    workoutDelete = (event) => {
        console.log('clicked')
        fetch(`http://localhost:3000/api/delete/${event.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.auth.sessionToken
            },
            body: JSON.stringify({ log: { id: event.target.id } })
        })
            .then(res => this.fetchWorkouts())
    }

    workoutUpdate = (event, workout) => {
        fetch(`http://localhost:3000/api/update/${workout.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.auth.sessionToken
            },
            body: JSON.stringify({ log: workout })
        })
            .then(res => {
                this.setState({ updatePressed: false });
                this.fetchWorkouts();
            })
    }
    setUpdatedWorkout = (event, workout) => {
        this.setState({
            workoutToUpdate: workout,
            updatePressed: true
        })
    }

    render() {
        const workouts = this.state.workouts.length >= 1 ? <WorkoutTable workouts={this.state.workouts} delete={this.workoutDelete} update={this.setUpdatedWorkout} /> : <h2>Log a workout to see the table</h2>

        return (
            <Container>
                <Row>
                    <Col md='3'>
                        <WorkoutCreate updateWorkoutsArray={this.fetchWorkouts} />
                    </Col>
                    <Col md='3'>
                        {workouts}
                    </Col>
                </Row>
                <Col md='12'>
                    {
                        this.state.updatePressed ? <WorkoutEdit t={this.state.updatePressed} update={this.workoutUpdate} workout={this.state.workoutToUpdate} /> : <div></div>
                    }
                </Col>
            </Container>
        )
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <WorkoutIndex {...props} auth={auth} />}
    </AuthContext.Consumer>
);
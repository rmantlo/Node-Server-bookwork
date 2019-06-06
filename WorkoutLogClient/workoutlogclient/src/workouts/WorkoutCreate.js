import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {AuthContext}  from '../auth/AuthContext';

class WorkoutCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            result: '',
            description: '',
            definition: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/create', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.auth.sessionToken
            },
            body: JSON.stringify({ log: this.state })
        })
            .then(res => res.json())
            .then(logData => {
                this.props.updateWorkoutsArray();
                this.setState({
                    id: '',
                    results: '',
                    description: '',
                    definition: ''
                })
            })
    }

    render() {
        return (
            <div>
                <h3>Log a Workout</h3>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='result'>Result</Label>
                        <Input id='result' name='result' type='text' value={this.state.result} placeholder='enter result' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='def'>Type</Label>
                        <Input type='select' name='definition' id='definition' value={this.state.definition} onChange={this.handleChange} placeholder='Type'>
                            <option></option>
                            <option value='Time'>Time</option>
                            <option value='Weight'>Weight</option>
                            <option value='Distance'>Distance</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='description'>Notes</Label>
                        <Input id='description' type='text' name='description' value={this.state.description} onChange={this.handleChange} placeholder='enter description' />
                    </FormGroup>
                    <Button type='submit' color='primary'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <WorkoutCreate {...props} auth={auth} />}
    </AuthContext.Consumer>
)
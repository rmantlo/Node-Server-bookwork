import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class WorkoutEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            result: '',
            description: '',
            definition: ''
        }
    }

    componentWillMount() {
        this.setState({
            id: this.props.workout.id,
            result: this.props.workout.result,
            description: this.props.workout.description,
            definition: this.props.workout.definition
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Log a workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for='result'>Result</Label>
                                <Input type='text' id='result' name='result' value={this.state.result} placeholder='enter result' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='definition'>Type</Label>
                                <Input type='select' name='definition' id='definition' value={this.state.definition} onChange={this.handleChange} placeholder='Type'>
                                    <option></option>
                                    <option value='Time'>Time</option>
                                    <option value='Weight'>Weight</option>
                                    <option value='Distance'>Distance</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for='description'>Notes</Label>
                                <Input type='text' id='description' name='description' value={this.state.description} placeholder='enter description' onChange={this.handleChange} />
                            </FormGroup>
                            <Button type='submit' color='primary'>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
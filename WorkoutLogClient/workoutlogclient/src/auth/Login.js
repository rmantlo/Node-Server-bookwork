import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.handleValidation();
        } else {
            fetch('http://localhost:3000/user/signin', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(data => {
                    this.props.setToken(data.sessionToken)
                })
        }
    }

    handleValidation = () => {
        let error = {
            username: '',
            pass: ''
        };
        if (!this.state.username) {
            error.username = 'Please enter a username.'
        }
        if (!this.state.password) {
            error.pass = 'Please enter a password.'
        }
        this.setState({ errors: error })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <h6>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input id='li_username' type='test' name='username' placeholder='enter username' onChange={this.handleChange} />
                        <span style={{ color: 'red' }}>{this.state.errors.username}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input id='li_password' type='password' name='password' placeholder='enter password' onChange={this.handleChange} />
                        <span style={{ color: 'red' }}>{this.state.errors.pass}</span>
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;
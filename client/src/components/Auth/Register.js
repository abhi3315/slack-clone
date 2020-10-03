import React, { Component } from 'react'
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false,
    }

    displayErrors = errors => {
        errors.map((error, i) => <p key={i} >{error.message}</p>)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit() {
        //handle form submission
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ?
            "error" :
            ""
    }

    render() {
        const { username, email, password, passwordConfirmation, errors, loading } = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app" >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" color="violet" textAlign="center" >
                        Register to Slack Clone
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked >
                            <Form.Input
                                fluid
                                name='username'
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={username}
                                type="text"
                            />
                            <Form.Input
                                fluid
                                name='email'
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInputError(errors, "email")}
                                type="email"
                            />
                            <Form.Input
                                fluid
                                name='password'
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                className={this.handleInputError(errors, "password")}
                                type="password"
                            />
                            <Form.Input
                                fluid
                                name='passwordConfirmation'
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                onChange={this.handleChange}
                                value={passwordConfirmation}
                                className={this.handleInputError(errors, "password")}
                                type="password"
                            />
                            <Button
                                className={loading ? "loading" : ""}
                                color="orage"
                                fluid
                                size="large"
                            >
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>
                        Already a user? Login
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register
import React, { Component } from 'react'
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../helper/api'

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false
    }

    displayErrors = errors => {
        errors.map((error, i) => <p key={i} >{error.message}</p>)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true })
            loginUser(this.state).then(user => {
                if (!user) {
                    this.setState({
                        errors: this.state.errors.concat({ message: 'Unable to login. Try again later!' }),
                        loading: false,
                    })
                    return
                }
                this.props.history.push("/");
            }).catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false,
                })
            })
        }
    }

    isFormValid = ({ email, password }) => email && password

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
            ? "error"
            : ""
    }

    render() {
        const { email, password, errors, loading } = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app" >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" color="violet" textAlign="center" >
                        Login to Slack Clone
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked >
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
                            <Button
                                className={loading ? "loading" : ""}
                                color="violet"
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
                        Don't have an account? <Link to="/register">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login
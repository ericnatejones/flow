import React from 'react'
import { Panel, Button, FormControl, ControlLabel, Col, FormGroup, Form } from 'react-bootstrap';

class SignUp extends React.Component {
  render () {
    return (
      <Panel>
        <Form onSubmit={this.props.handleSignup} horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={3}>
              Name
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.handleChange}
                           value={this.props.name}
                           name="name"
                           type="text"
                           placeholder="Name" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={3}>
              User Name
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.handleChange}
                           value={this.props.username}
                           name="username"
                           type="text"
                           placeholder="Username"
                           required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={3}>
              Password
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.handleChange}
                           value={this.props.password}
                           name="password"
                           type="password"
                           placeholder="Password"
                           minLength="8"
                           required
                           />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={9}>
              <Button onClick={this.props.signUp} bsStyle="info" type="submit">
                Sign up
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }
}

export default SignUp;

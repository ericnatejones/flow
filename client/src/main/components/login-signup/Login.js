import React from 'react'
import { Panel, Button, FormControl, ControlLabel, Col, FormGroup, Form } from 'react-bootstrap';

class Login extends React.Component {
  render () {
    return (
      <Panel>
        <Form horizontal onSubmit={this.props.handleLogin}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={3}>
              User Name
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.handleChange}
                           value={this.props.loginUsername}
                           name="loginUsername"
                           type="text"
                           placeholder="User Name" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={3}>
              Password
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.handleChange}
                           value={this.props.loginPassword}
                           name="loginPassword"
                           type="password"
                           placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={9}>
              <Button onClick={this.props.logIn} type="submit" bsStyle="info">
                Log in 
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }
}

export default Login;

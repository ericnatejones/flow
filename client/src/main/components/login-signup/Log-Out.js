import React from 'react'
import { Button } from 'react-bootstrap';

class LogOut extends React.Component {
  render () {
    return (
      <div>
        <Button className="pull-right" bsStyle="info" onClick={this.props.handleLogout}>log out</Button>
        <div className="pull-left">Hi {this.props.name}</div>
      </div>
    )
  }
}

export default LogOut;

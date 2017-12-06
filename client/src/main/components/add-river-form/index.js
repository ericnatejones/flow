import React, {Component} from "react";
import { Col, Row, Panel, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import { submitRiver } from "../../../redux/actions";
import { connect } from "react-redux";

class AddRiverForm extends Component{
  constructor(){
    super()
    this.state = {
      river: "",
      knownTitle: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.submitRiver({url:this.state.river, knownTitle:this.state.knownTitle});
    this.setState({river: "", knownTitle: ""})
  }

  render(){
    const styles = {
      marginTop: "40px"
    }
    return (
      <Row style={styles}>
        <Col sm={8} smOffset={2}>
          <Panel>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalRiver">
                <Col componentClass={ControlLabel} sm={3}>
                  Add Rivers to Database
                </Col>
                <Col sm={7}>
                  <FormControl onChange={this.handleChange}
                               value={this.state.river}
                               name="river"
                               type="text"
                               placeholder="River to Add" />
                             {this.props.authReducer.isAdmin ? <FormControl onChange={this.handleChange}
                               value={this.state.knownTitle}
                               name="knownTitle"
                               type="text"
                               placeholder="Known Title (Optional)" /> : null }
                </Col>
                <Col sm={2}>
                  <Button type="submit">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>

        </Col>
      </Row>
    )
  }
}

export default connect(state => state, {submitRiver}) (AddRiverForm);

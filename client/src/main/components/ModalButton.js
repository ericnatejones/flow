import React, {Component} from "react"
import {Button, Modal, OverlayTrigger, Popover, Tooltip} from "react-bootstrap"

class ModalButton extends Component{
  constructor(props) {
      super(props);
      this.state = { showModal: false }
      this.open = this.open.bind(this)
      this.close = this.close.bind(this)
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="USGS">
        United State Geological Survey Water Data
      </Popover>
    );
    const urltip = (
      <Popover id="modal-popover" title="Example">
        https://waterdata.usgs.gov/nwis/uv?site_no=13022500
      </Popover>
    );

    const marginTop = {
      marginTop: "20px"
    }

    return (
      <div style={marginTop}>
        <Button
          bsStyle="info"
          bsSize="medium"
          onClick={this.open}
        >
          Learn about this App
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <p>Anyone may add rivers to the database.</p>
            <p>You need to grab the url from <OverlayTrigger overlay={popover}><a href="https://waterdata.usgs.gov/nwis/rt">USGS</a></OverlayTrigger> and add it via the form provided.</p>
            <p>Any <OverlayTrigger overlay={urltip}><a>url</a></OverlayTrigger> will work that includes the 8 digit id for any given river.</p>
            <p>After you have signed up, you will automattacly be logged in.</p>
            <p>Once you have logged in, Click a river to add it to your favorites.</p>
            <p>You may edit the lower and upper parameter, and your favorites will be color coded.</p>
            <p>Red means it's too low, blue means it's too high, and green means that it is within your set parameters.</p>
            <p>When an admin would like to enter a river with a custom name (not one given by USGS) they are given an extra field to do that.</p>
            <p>Contact Eric Jones, the kayaker, to become an admin.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default ModalButton

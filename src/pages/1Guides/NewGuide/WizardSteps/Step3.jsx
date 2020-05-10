import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Wizard extends Component {
  render() {
    return (
      <>
        <Row className="justify-content-center">
          <Col sm="12">
            <h5 className="info-text">
              All done!
            </h5>
          </Col>
          <Col sm="12">
            <h5 className="info-text">
              Your new guide has been successfully added.
            </h5>
          </Col>
        </Row>
      </>
    );
  }
}

export default Wizard;

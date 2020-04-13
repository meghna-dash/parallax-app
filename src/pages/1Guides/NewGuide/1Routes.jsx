import React, { Component } from "react";
import classnames from "classnames";
import { Row, Col } from "reactstrap";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRoutes: true,
    }
  }

  render() {
    return (
      <>
        <h5 className="info-text">
          Which routes would you like to show this guide on?
        </h5>
        <Row className="justify-content-center">
          <Col lg="10">
            <Row>
              <Col sm="4">
              </Col>
              <Col sm="4">
                <div
                  className={classnames("choice", { active: this.state.allRoutes })}
                >
                  <input
                    defaultValue="All Routes"
                    name="jobb"
                    type="checkbox"
                    defaultChecked={this.state.allRoutes}
                  />
                  <div className="icon">
                    <i className="nc-icon nc-laptop" />
                  </div>
                  <h6>All Routes</h6>
                </div>
              </Col>
              <Col sm="4">
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default Routes;

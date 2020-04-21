import React, { Component } from "react";
import { Card, Col, Row } from 'reactstrap';
import GuideViewsGraph from './GuideViewsGraph';
import NewUserEngagement from './NewUserEngagement';
import GuidesTable from '../1Guides/GuidesTable';
import MostViewedGuide from './MostViewedGuide';

class Sessions extends Component {
  render() {
    return (
      <div className="content">
        <row>
          <Col lg="8">
            <GuideViewsGraph />
          </Col>
          <Col lg="4">
            <NewUserEngagement />
          </Col>
        </row>
        <row>
          <Col lg="4">
            <GuidesTable />
          </Col>
          <Col lg="4">
            <MostViewedGuide />
          </Col>
          <Col lg="4">
            <Card />
          </Col>
        </row>
      </div>
    );
  }
}

export default Sessions;

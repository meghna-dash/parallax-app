import React, { Component } from "react";
import { Card, Col, Row } from 'reactstrap';
import GuideViewsGraph from './GuideViewsGraph';
import NewUserEngagement from './NewUserEngagement';
import GuidesTable from '../1Guides/GuidesTable';
import MostViewedGuide from './MostViewedGuide';
import './analytics.css';

class Sessions extends Component {
  render() {
    return (
      <div className="content" style={{ paddingBottom: '20px'}}>
        <Row>
          <Col lg="8">
            <GuideViewsGraph />
          </Col>
          <Col lg="4">
            <NewUserEngagement />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <GuidesTable />
          </Col>
          <Col lg="4">
            <MostViewedGuide />
          </Col>
          <Col lg="4">
            <Card />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Sessions;

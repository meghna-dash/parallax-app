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
      <div className="content analytics-cards" style={{ paddingBottom: '20px'}}>
        <div class="grid">
          <div class="grid-guide-views"><GuideViewsGraph /></div>
          <div class="grid-most-viewed-guide"><MostViewedGuide /></div>
          <div class="grid-guides"><GuidesTable /></div>
          <div class="grid-new-user-engagement"><NewUserEngagement /></div>
        </div>
      </div>
    );
  }
}

export default Sessions;

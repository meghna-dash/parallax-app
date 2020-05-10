import React, { Component } from "react";
import { Card, Col, Row } from 'reactstrap';
import SessionViewsGraph from './SessionViewsGraph';
import GuideViewsGraph from './GuideViewsGraph';
import UserEngagement from './UserEngagement';
import GuidesTable from '../1Guides/GuidesTable';
import MostViewedGuide from './MostViewedGuide';
import './analytics.css';

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      sessions: []
    };
  }

  componentDidMount() {
    this.getSessions();
  }

  async getSessions() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getSessions,
        {
          pk: sessionStorage.getItem("projectID"),
          sk: "session"
        }
      ));
      this.setState({
        sessions: response.data.getSessions,
        ready: true
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <div className="content analytics-cards" style={{ paddingBottom: '20px'}}>
        {this.state.ready &&
          <div class="grid">
            <div class="grid-session-views"><SessionViewsGraph sessions={this.state.sessions} /></div>
            <div class="grid-guide-views"><GuideViewsGraph sessions={this.state.sessions} /></div>
            <div class="grid-guides"><GuidesTable history={this.props.history} /></div>
            <div class="grid-new-user-engagement"><UserEngagement sessions={this.state.sessions} /></div>
          </div>
        }
      </div>
    );
  }
}

export default Sessions;

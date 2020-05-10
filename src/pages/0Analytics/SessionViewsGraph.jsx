import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

class SessionViewsGraph extends Component {
  constructor(props) {
    super(props);

    const earliest = Date.now() - (7 * 1000 * 60 * 60 * 24);
    var sessions = props.sessions.filter(s => s.ts >= earliest);
    this.data = {
      labels: this.lastSevenDays(),
      datasets: [
        {
          label: "Count",
          borderColor: "#6CD098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          data: this.calculateCounts()
        }
      ]
    };
    this.options = {
      legend: {
        display: false
      },
      hover: {
        mode: 'index',
        intersect: false
      },
      scales: {
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: true,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)"
            }
          }
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }
        ]
      }
    }
  }

  calculateCounts = () => {
    var counts = [0, 0, 0, 0, 0, 0, 0];
    var now = Date.now();
    const day = 1000 * 60 * 60 * 24;
    this.props.sessions.forEach(s => {
      var dayIndex = 6 - Math.floor(Math.floor(now - s.ts) / day);
      counts[dayIndex]++;
    });
    return counts;
  }

  lastSevenDays = () => {
    var result = [];
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    var dayIndex = new Date().getDay();
    result = days.slice(dayIndex + 1, days.length).concat(days.slice(0, dayIndex + 1));
    return result;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <p className="card-category">Sessions Over the Last Week</p>
        </CardHeader>
        <CardBody>
          <Line
            data={this.data}
            options={this.options}
          />
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="fa fa-history" />
            Updated just now
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default SessionViewsGraph;

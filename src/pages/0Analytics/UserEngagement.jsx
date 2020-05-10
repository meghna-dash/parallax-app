import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
} from "reactstrap";

class UserEngagement extends Component {
  constructor(props) {
    super(props);

    this.data = {
      labels: ["Viewed", "Did not view"],
      datasets: [
        {
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#fcc468", "#f4f3ef"],
          borderWidth: 0,
          data: this.calculatePercentage()
        }
      ]
    }
    this.options = {
      cutoutPercentage: 80,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        bodyFontColor: "black"
      }
    }
  }

  calculatePercentage = () => {
    var engaged = this.props.sessions.filter(s => s.guides && s.guides.length > 1).length;
    return [engaged, this.props.sessions.length - engaged];
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">User Engagement</CardTitle>
          <p className="card-category">Users who viewed a guide</p>
        </CardHeader>
        <CardBody>
          <Doughnut
            data={this.data}
            options={this.options}
            className="ct-chart ct-perfect-fourth"
            height={300}
            width={456}
          />
        </CardBody>
        <CardFooter>
          <div className="legend">
            <i className="fa fa-circle text-warning" />
            Viewed
          </div>
          <hr />
          <div className="stats">
            <i className="fa fa-check" />
            Engaged users are 3x more likely to convert
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default UserEngagement;

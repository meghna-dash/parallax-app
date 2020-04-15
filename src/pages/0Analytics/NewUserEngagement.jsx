import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { chartExample6 } from "./ChartVariables";

class NewUserEngagement extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">New User Engagement</CardTitle>
          <p className="card-category">New users who viewed a guide</p>
        </CardHeader>
        <CardBody>
          <Doughnut
            data={chartExample6.data}
            options={chartExample6.options}
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

export default NewUserEngagement;

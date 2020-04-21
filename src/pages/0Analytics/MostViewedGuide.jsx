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
import { chartExample12 } from "./ChartVariables";

class MostViewedGuide extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Most Viewed Guide</CardTitle>
          <p className="card-category"> Guide that has helped your users the most</p>
        </CardHeader>
        <CardBody>

        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="fa fa-history" />
            Updated 3 minutes ago
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default MostViewedGuide;

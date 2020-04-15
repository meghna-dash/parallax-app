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

class GuideViewsGraph extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Guide Views</CardTitle>
          <p className="card-category"> Views over the last week</p>
        </CardHeader>
        <CardBody>
          <Line
            data={chartExample12.data}
            options={chartExample12.options}
            width={400}
            height={100}
          />
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

export default GuideViewsGraph;

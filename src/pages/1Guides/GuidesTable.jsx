import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import "./guides.css";

class GuidesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      guides: [{
        title: "Title",
        description: "Create a guide to get started.",
        views: "Views",
      }]
    };
    this.queryForGuides = this.queryForGuides.bind(this);
  }

  goToGuides = () => {
    this.props.history.push("/app/guides");
  }

  async queryForGuides() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getGuides,
        {
          pk: sessionStorage.getItem("projectID"),
          sk: "guide"
        }
      ));
      this.setState({
        guides: response.data.getGuides.length > 3 ? response.data.getGuides.slice(0, 3) : response.data.getGuides,
      })
    }
    catch (error) {
      // console.log('error', error);
    }
  }

  componentDidMount() {
    this.queryForGuides();
  }


  render() {
    return (
      <Card>
        <CardHeader>
          <Button
            style={{ float: 'right', backgroundColor: "#f7598b" }}
            onClick={this.goToGuides}
          >
            Edit Guides
          </Button>
          <CardTitle tag="h4">Most Popular Guides</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr className="table-header">
                <th className="text-center"></th>
                <th className="text-center">Title</th>
                <th className="text-center">Description</th>
                <th className="text-center">Views</th>
              </tr>
            </thead>
            <tbody>
              {this.state.guides.map((guide, key) =>
                <tr>
                  <td className="text-center">{key + 1}</td>
                  <td>{guide.title}</td>
                  <td>{guide.description}</td>
                  <td>{guide.views}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default GuidesTable;

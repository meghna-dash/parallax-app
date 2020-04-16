import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import NewGuideModal from './NewGuide/NewGuideModal';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

class GuidesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      guides: [{
        title: "",
        description: "Create a guide to get started.",
        views: "",
      }]
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.queryForGuides = this.queryForGuides.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  async queryForGuides() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getGuides,
        {
          pk: "e7f31b8e-04fe-4313-bad4-4bb118428def",
          sk: "guide"
        }
      ))
      console.log(response.data.getGuides);
      this.setState({
        guides: response.data.getGuides,
      })
    }
    catch (error) {
      console.log('error', error);
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
            style={{ float: 'right' }}
            onClick={this.toggleModal}
          >
            + New Guide
          </Button>
          <NewGuideModal
            modal={this.state.modal}
            toggleModal={this.toggleModal}
          />
          <CardTitle tag="h4">Guides</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th className="text-center">1</th>
                <th className="text-center">Title</th>
                <th className="text-center">Description</th>
                <th className="text-center">Views</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.guides.map((guide, key) =>
                <tr>
                  <td className="text-center">{key + 1}</td>
                  <td>{guide.title}</td>
                  <td>{guide.description}</td>
                  <td>{guide.views}</td>
                  <td className="text-center">
                    <Button
                      className="btn-icon"
                      color="primary"
                      id="play-tooltip"
                      size="sm"
                      type="button"
                    >
                      <i className="nc-icon nc-button-play" />
                    </Button>{" "}
                    <UncontrolledTooltip
                      delay={0}
                      target="play-tooltip"
                    >
                      Play
                    </UncontrolledTooltip>
                    <Button
                      className="btn-icon"
                      color="success"
                      id="edit-tooltip"
                      size="sm"
                      type="button"
                    >
                      <i className="fa fa-edit" />
                    </Button>{" "}
                    <UncontrolledTooltip
                      delay={0}
                      target="edit-tooltip"
                    >
                      Edit
                    </UncontrolledTooltip>
                    <Button
                      className="btn-icon"
                      color="danger"
                      id="delete-tooltip"
                      size="sm"
                      type="button"
                    >
                      <i className="fa fa-times" />
                    </Button>{" "}
                    <UncontrolledTooltip
                      delay={0}
                      target="delete-tooltip"
                    >
                      Delete
                    </UncontrolledTooltip>
                  </td>
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

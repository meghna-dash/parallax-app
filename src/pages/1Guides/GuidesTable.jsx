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

class GuidesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    })
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
              <tr>
                <td className="text-center">2</td>
                <td>John Doe</td>
                <td>Step 1, squish. Step 2, more squish. Step 3, warmy fuzzy feelings.</td>
                <td>69</td>
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
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default GuidesTable;

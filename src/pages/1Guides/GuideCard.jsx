import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

class GuideCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pk: props.pk,
      sk: props.sk,
      title: props.title,
      description: props.description,
      path: props.path,
      views: props.views,
      showModal: false,
      showAlert: false
    }

    this.refresh = props.refresh.bind(this);
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
    console.log(this.state)
  }

  toggleAlert = () => {
    this.setState({
      showAlert: !this.state.showAlert
    });
  }

  deleteGuide = async () => {
    try {
      const response = await API.graphql(graphqlOperation(mutations.deleteGuide,
        {
          pk: this.state.pk,
          sk: this.state.sk
        }
      ));
      this.toggleModal();
      this.refresh();
    }
    catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <Col md="3">
        <Card tag="a" className="card-doc" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle tag="h4">
              {this.state.title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <h5 className="card-category">
              {this.state.description}
            </h5>
            <h5 className="card-category">
              {this.state.views} views
            </h5>
          </CardBody>
        </Card>

        <Modal style={{maxWidth: '1600px', width: '50%'}} isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <Alert color="danger" isOpen={this.state.showAlert} toggle={this.toggleAlert}>
            Are you sure you want to delete this guide? It cannot be recovered after deleting.
            <br />
            <Button onClick={this.deleteGuide}>
              Yes
            </Button>
            <Button onClick={this.toggleAlert}>
              No
            </Button>
          </Alert>
          <div className="modal-header justify-content-right">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">{this.state.title}</h5>
          </div>
          <ModalBody>
            {this.state.description}
            <br />
            <div style={{ alignItems: "center", margin: "auto", width: "80%" }}>
              <video
                id="guide-video"
                controlsList="nodownload"
                controls
                preload="metadata"
                fluid="true"
                responsive="true"
              >
                <source src={this.state.path} type="video/mp4"/>
              </video>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button style={{ marginLeft: "auto", marginRight: "auto" }} color="secondary" onClick={this.toggleAlert}>
              Delete Guide
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    )
  }
}

export default GuideCard;

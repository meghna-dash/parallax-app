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
} from "reactstrap";
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import './guides.css';

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
  }

  toggleAlert = () => {
    this.setState({
      showAlert: !this.state.showAlert
    });
  }

  deleteGuide = async () => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteGuide,
        {
          pk: this.state.pk,
          sk: this.state.sk
        }
      ));
      this.toggleModal();
      this.refresh();
    }
    catch {
      // console.log(error);
    }
  }

  render() {
    return (
      <Col md="3">
        <Card tag="a" className="card-doc guide-card" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle className="guide-card-title" tag="h5">
              {this.state.title}
            </CardTitle>
          </CardHeader>
          <CardText>
            <h5 className="card-category">
              {this.state.description}
            </h5>
            <h5 className="card-category">
              {this.state.views} views
            </h5>
          </CardText>
          <CardBody/>
        </Card>

        <Modal
          className="guide-view-modal"
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          size="lg"
        >
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
          <div class="card">
            <div style={{ background: 'black'}} >
              <video
                id="guide-video"
                controlsList="nodownload"
                controls
                preload="metadata"
                fluid="true"
                responsive="true"
                height="450px"
                style={{ width: "100%" }}
              >
                <source src={this.state.path} type="video/mp4"/>
              </video>
            </div>
            <div class="card-text">
              <span class="date">4 days ago</span>
              <h2 className="modal-title">{this.state.title}</h2>
              <p>{this.state.description}</p>
            </div>
            <Button
              className="btn-link btn btn-primary guide-delete-button"
              onClick={this.toggleAlert}>
              Delete Guide
            </Button>
            <div class="card-stats">
              <div class="stat">
                <div class="value">ALL</div>
                <div class="type">routes</div>
              </div>
              <div class="stat border">
                <div class="value">{this.state.views}</div>
                <div class="type">views</div>
              </div>
              <div class="stat">
                <div class="value">0</div>
                <div class="type">users</div>
              </div>
            </div>
          </div>
        </Modal>
      </Col>
    )
  }
}

export default GuideCard;

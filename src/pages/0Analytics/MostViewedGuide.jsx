import React, { Component } from "react";
import { Line } from "react-chartjs-2";
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
import '../1Guides/guides.css';

class MostViewedGuide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pk: "",
      sk: "",
      title: "Get Started With Covfefe-19",
      description: "How to add and use the Covfefe-19 browser extension",
      path: props.path,
      views: 626,
      showModal: false,
      showAlert: false
    }
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

  render() {
    return (
      <Card>
        <Card tag="a" className="card-doc guide-card" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle tag="h4">Most Viewed Guide</CardTitle>
            <p className="card-category"> Guide that has helped your users the most </p>
          </CardHeader>


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
              <button
                className="btn-link btn btn-primary guide-delete-button"
                onClick={this.toggleAlert}>
                Delete Guide
              </button>
              <div class="card-stats">
                <div class="stat">
                  <div class="value">ALL</div>
                  <div class="type">routes</div>
                </div>
                <div class="stat border">
                  <div class="value">5,123</div>
                  <div class="type">views</div>
                </div>
                <div class="stat">
                  <div class="value">4,235</div>
                  <div class="type">users</div>
                </div>
              </div>
              </div>
        </Card>
      </Card>
    );
  }
}

export default MostViewedGuide;

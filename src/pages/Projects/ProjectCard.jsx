import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  CardBody,
  CardFooter,
  Col,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as moment from 'moment';

class ProjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      loaded: false,
      showModal: false,
      currentProject: props.currentProject,
      name: "",
      ts: 0,
      url: "",
    }

    this.refresh = props.refresh.bind(this);
  }

  componentDidMount() {
    this.getProjectData();
  }

  getProjectData = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(queries.getProject,
        {
          pk: this.state.id,
          sk: "project"
        }
      ));
      var project = resp.data.getProject[0]
      this.setState({
        name: project.name,
        ts: project.ts,
        url: project.url,
        loaded: true
      });
    }
    catch (error) {
      console.log('error', error);
    }
  }

  setActiveProject = async () => {
    try {
      const response = await API.graphql(graphqlOperation(mutations.updateUser,
        {
          pk: sessionStorage.getItem("userID"),
          sk: "user",
          currentProject: this.state.id
        }
      ))
      this.refresh();
    }
    catch (error) {
      console.log('error', error);
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      <Col md="3">
        {this.state.loaded &&
          <Card tag="a" className="card-doc project-card" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
            <CardHeader>
              <CardTitle tag="h5" className="project-card-title">
                {this.state.name}
              </CardTitle>
            </CardHeader>
              <CardText>
                <h5 className="card-category">
                  Created {moment.unix(`${this.state.ts / 1000 }`).format('LL')}
                </h5>
                {this.state.url}
              </CardText>
              <CardBody>
              {this.state.id == this.state.currentProject ?
                <Button className="project-card-button" disabled>Current project</Button> :
                <Button className="project-card-button" onClick={() => this.setActiveProject}>Activate project</Button>
              }
              </CardBody>
          </Card>
        }
        <Modal className="project-modal"style={{maxWidth: '1600px', width: '50%'}} isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <div className="modal-header justify-content-right">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">{this.state.name}</h5>
          </div>
          <ModalBody>
            Insert this code snippet into the head tag of your application. This will inject our guide widget and recorder into your website and allow us to learn about your users' behaviors.
            <pre>
              <code className="language-json">
                {`
                  <script type=text/javascript>
                    var projectID="${this.state.id}";
                    window.sessionStorage.setItem("parallax-pid", projectID);
                    document.addEventListener("DOMContentLoaded", (event) => {
                      var head = document.getElementsByTagName("head").item(0);
                      var recorderScript = document.createElement("script");
                      var injectScript = document.createElement("script");
                      recorderScript.setAttribute("type", "text/javascript");
                      injectScript.setAttribute("type", "text/javascript");
                      recorderScript.setAttribute("src", "https://static.parallaxux.com/recorder.js");
                      injectScript.setAttribute("src", "https://static.parallaxux.com/inject.js");
                      head.appendChild(recorderScript);
                      head.appendChild(injectScript);
                    });
                  </script>
                `}
              </code>
            </pre>
          </ModalBody>
        </Modal>
      </Col>
    );
  }
}

export default ProjectCard;

import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
import ProjectCard from "./ProjectCard.jsx";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { uuid } from 'uuidv4';
import './projects.css';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      currentProject: null,
      showModal: false,
      showAlert: false,
      newProjectName: "",
      newProjectUrl: "",
      loaded: false
    }
  }

  componentDidMount() {
    this.getProjects();
  }

  async getProjects() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getUser,
        {
          pk: sessionStorage.getItem("userID"),
          sk: "user"
        }
      ));
      this.setState({
        projects: response.data.getUser[0].projects,
        currentProject: response.data.getUser[0].currentProject,
        loaded: true
      });
    }
    catch (error) {
      console.log('error', error);
    }
  }

  toggleNewProjectModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  createNewProject = async () => {
    if (this.state.projects.length < 1 && this.state.loaded) {
      const id = uuid();
      try {
        const response = await API.graphql(graphqlOperation(mutations.putProject,
          {
            pk: id,
            sk: "project",
            name: this.state.newProjectName,
            url: this.state.newProjectUrl,
            isRecording: true,
            creator: sessionStorage.getItem("userID"),
            dateCreated: Date.now().toString()
          }
        ));
        const resp = await API.graphql(graphqlOperation(mutations.updateUserProjects,
          {
            pk: sessionStorage.getItem("userID"),
            sk: "user",
            newProject: id
          }
        ));
        this.getProjects();
        this.setState({
          newProjectName: "",
          newProjectUrl: ""
        });
      }
      catch (error) {
        console.log('error', error);
      }
    } else {
      this.toggleAlert();
    }
  }

  handleNewProjectChange = async (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  toggleAlert = () => {
    this.setState({
      showAlert: !this.state.showAlert,
      showModal: false
    });
  }

  render() {
    return (
      <div className="content">
        <Alert color="danger" isOpen={this.state.showAlert} toggle={this.toggleAlert}>
          We do not currently support more than one project per user!
        </Alert>
        <Row>
          {this.state.projects.map(project => (
            <ProjectCard
              id={project}
              currentProject={this.state.currentProject}
              refresh={this.getProjects}
            />
          ))}
          <Col md="3">
            <Card
              tag="a"
              className="card-doc project-card"
              onClick={this.toggleNewProjectModal}
              style={{ cursor: "pointer" }}
            >
              <CardHeader>
                <CardTitle tag="h5" className="project-card-title">
                  Create New Project
                </CardTitle>
                <CardSubtitle>
                  Create a new project to add Parallax to your product. This project will serve your entire domain or product.
                </CardSubtitle>
              </CardHeader>
              <CardBody/>
            </Card>
          </Col>
        </Row>

        <Modal style={{maxWidth: '1600px', width: '50%'}} isOpen={this.state.showModal} toggle={this.toggleNewProjectModal} size="lg">
          <div className="modal-header justify-content-right">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleNewProjectModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Create New Project</h5>
          </div>
          <ModalBody>
            <Form onSubmit={(e) => this.createNewProject(e)}>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="newProjectName"
                    id="newProjectName"
                    value={this.state.newProjectName}
                    placeholder="Project name"
                    onChange={(e) => {this.handleNewProjectChange(e)}}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="newProjectUrl"
                    id="newProjectUrl"
                    value={this.state.newProjectUrl}
                    placeholder="Website URL"
                    onChange={(e) => {this.handleNewProjectChange(e)}}
                  />
                </FormGroup>
              </Col>
              <div align="center">
                <Button color="primary" onClick={this.createNewProject}>
                  Submit
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Projects;

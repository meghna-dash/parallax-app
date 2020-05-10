import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  Col,
  Form,
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
import NewProject from '../../assets/img/new_project.svg';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: null,
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
        projects: response.data.getUser[0].projects.length > 0 ? response.data.getUser[0].projects.slice(1) : null,
        currentProject: response.data.getUser[0] ? response.data.getUser[0].currentProject : null,
        loaded: true
      });
    }
    catch (error) {
      // console.log('error', error);
    }
  }

  toggleNewProjectModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  createNewProject = async () => {
    if (this.state.projects.length <= 1 && this.state.loaded) {
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
            ts: Date.now().toString()
          }
        ));
        await API.graphql(graphqlOperation(mutations.updateUserProjects,
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
        this.toggleNewProjectModal();
      }
      catch (error) {
        // console.log('error', error);
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
          We do not currently support more than one project per user.
        </Alert>
        <Row>
          {this.state.projects && this.state.projects.map(project => (
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

        <Modal style={{maxWidth: '2300px', width: '60%'}} isOpen={this.state.showModal} toggle={this.toggleNewProjectModal} size="lg">
          <div className="modal-header justify-content-right">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleNewProjectModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h3 className="modal-title">Create New Project</h3>
          </div>
          <ModalBody>
            <Row>
              <Col lg="6">
                <img src={NewProject} alt="new-project"/>
              </Col>
              <Col lg="6">
                <h5 style={{ padding: "70px 0", marginBottom: '24px' }}>
                  Create a new project to add Parallax to your product. This project will serve your entire domain or product.
                </h5>
                <Form style={{ padding: "0px"}}>
                  <div class="form-group">
                    <input
                      type="text"
                      name="newProjectName"
                      id="newProjectName"
                      value={this.state.newProjectName}
                      required
                      onChange={(e) => {this.handleNewProjectChange(e)}}
                    />
                    <label>Project Name</label>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      required
                      name="newProjectUrl"
                      id="newProjectUrl"
                      value={this.state.newProjectUrl}
                      onChange={(e) => {this.handleNewProjectChange(e)}}
                    />
                    <label>Website URL</label>
                  </div>
                  <div align="center">
                    <Button onClick={(e) => this.createNewProject(e)} style={{ fontSize: "1em", backgroundColor: "#f7598b"}}>
                      Create Project
                    </Button>
                  </div>
                  </Form>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Projects;

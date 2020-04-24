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
  }

  componentDidMount() {
    this.getProjectData();
  }

  async getProjectData() {
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

  async setActiveProject() {
    try {
      const response = await API.graphql(graphqlOperation(mutations.updateUser,
        {
          pk: sessionStorage.getItem("userID"),
          sk: "user",
          currentProject: this.state.id
        }
      ))
    }
    catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <Col md="3">
        {this.state.loaded &&
          <Card className="card-doc project-card">
            <CardHeader>
              <CardTitle tag="h5" className="project-card-title">
                {this.state.name}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>
                <h5 className="card-category">
                  Created {moment.unix(`${this.state.ts / 1000 }`).format('LL')}
                </h5>
                {this.state.url}
              </CardText>
              {this.state.id == this.state.currentProject ?
                <Button className="project-card-button" disabled>Current project</Button> :
                <Button className="project-card-button" onClick={() => this.setActiveProject}>Activate project</Button>
              }
            </CardBody>
          </Card>
        }
      </Col>
    );
  }
}

export default ProjectCard;

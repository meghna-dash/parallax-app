import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
import GuideCard from "./GuideCard.jsx";
import NewGuideModal from './NewGuide/NewGuideModal';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

class Guides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guides: [],
      showModal: false
    }
  }

  componentDidMount() {
    this.getGuides();
  }

  getGuides = async () => {
    try {
      const response = await API.graphql(graphqlOperation(queries.getGuides,
        {
          pk: sessionStorage.getItem("projectID"),
          sk: "guide"
        }
      ))
      this.setState({
        guides: response.data.getGuides,
      })
    }
    catch (error) {
      console.log('error', error);
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    return (
      <div className="content">
        <Row>
          {this.state.guides.map(guide => (
            <GuideCard {...guide} refresh={this.getGuides}/>
          ))}
          <Col md="3">
            <Card tag="a" className="card-doc" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
              <CardHeader>
                <CardTitle tag="h4">
                  Create New Guide
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <NewGuideModal
          modal={this.state.showModal}
          toggleModal={this.toggleModal}
          refresh={this.getGuides}
        />
      </div>
    );
  }
}

export default Guides;

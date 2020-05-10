import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  Col,
  Row
} from "reactstrap";
import GuideCard from "./GuideCard.jsx";
import NewGuideModal from './NewGuide/NewGuideModal';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

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
      // console.log('error', error);
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
            <Card
              tag="a"
              className="card-doc guide-card"
              onClick={this.toggleModal}
              style={{ cursor: "pointer" }}
            >
              <CardHeader>
                <CardTitle className="guide-card-title" tag="h5">
                  Create New Guide
                </CardTitle>
                <CardSubtitle>
                  Create a new guide to show your users. Upload a video, add a description, and we will take care of the rest.
                </CardSubtitle>
              </CardHeader>
              <CardBody/>
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

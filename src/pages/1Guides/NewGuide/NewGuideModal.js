import React, { Component } from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Col, Modal } from "reactstrap";
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../../graphql/mutations';
import axios from "axios";

class NewGuideModal extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      selectedFile: null,
      projectID: sessionStorage.getItem("projectID"),
      guideID: uuidv4(),
      title: "",
      description: "",
      bucketURL: "https://parallax-videos.s3.amazonaws.com/"
    };
    this.nextStep = this.nextStep.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.putGuidesInDynamo = this.putGuidesInDynamo.bind(this);
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1,
    })
  }

  onFileChange = event => {
    console.log(event)
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  finishButtonClick() {
    this.putGuidesInDynamo();
    this.saveFiletoS3();
    this.props.toggleModal();
    this.props.refresh();
  }

  async putGuidesInDynamo() {
    console.log("START");
    console.log({
      pk: this.state.projectID,
      sk: "guide_" + this.state.guideID,
      title: this.state.title,
      description: this.state.description,
      routes: "/*",
      views: 0,
      path: this.state.bucketURL + this.state.projectID + "/videos/" + this.state.guideID + ".mp4"
    })
    console.log("END");

    try {
      const response = await API.graphql(graphqlOperation(mutations.putGuides,
        {
          pk: this.state.projectID,
          sk: "guide_" + this.state.guideID,
          title: this.state.title,
          description: this.state.description,
          routes: "/*",
          views: "0",
          path: this.state.bucketURL + this.state.projectID + "/videos/" + this.state.guideID + ".mp4"
        }
      ))
      console.log(response.data.putGuides);
    }
    catch (error) {
      console.log('error', error);
    }
  }

  saveFiletoS3 = () => {
    console.log("file", this.state.selectedFile)
    const videoID = this.state.projectID + "/videos/" + this.state.guideID;
    axios(
      "https://npmvy24qlj.execute-api.us-east-1.amazonaws.com/dev/upload?fileName=" +
        videoID + ".mp4"
    ).then(response => {
      const url = response.data.fileUploadURL;
      axios({
        method: "PUT",
        url: url,
        data: this.state.selectedFile,
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res => {
        console.log("successful", res)
      })
      .catch(err => {
        console.log("error", err)
      });
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggleModal}
      >
        <ReactWizard
          steps={[
            {
              stepName: "Upload",
              stepIcon: "nc-icon nc-laptop",
              component: <Step1
                onFileChange={this.onFileChange}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
              />
            },
            {
              stepName: "Routes",
              stepIcon: "nc-icon nc-paper",
              component: Step2
            },
            {
              stepName: "Finish",
              stepIcon: "nc-icon nc-button-play",
              component: Step3
            }
          ]}
          navSteps
          validate
          title="Create New Guide"
          description="Teach your users how to use your app using guides"
          headerTextCenter
          finishButtonClasses="btn-wd"
          nextButtonClasses="btn-wd"
          previousButtonClasses="btn-wd"
          finishButtonClick={this.finishButtonClick}
        />
    </Modal>
    );
  }
}

export default NewGuideModal;

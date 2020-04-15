import React, { Component } from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Col, Modal } from "reactstrap";
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import { Storage } from 'aws-amplify';

class NewGuideModal extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      selectedFile: null,
    };
    this.nextStep = this.nextStep.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
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

  finishButtonClick() {
    this.saveFiletoS3();
    this.props.toggleModal();
  }

  saveFiletoS3 = () => {
    console.log("file", this.state.selectedFile)
    Storage.put(this.state.selectedFile)
    .then(response => {
      console.log("successful", response)
    })
    .catch(error => {
      console.log("error", error)
    })
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
              component: <Step1 onFileChange={this.onFileChange} />
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

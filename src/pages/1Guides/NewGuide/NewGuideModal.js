import React, { Component } from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Col, Modal } from "reactstrap";
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";

var steps = [
  {
    stepName: "Upload",
    stepIcon: "nc-icon nc-laptop",
    component: Step1
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
];

class NewGuideModal extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      selectedFile: null,
    };
    this.nextStep = this.nextStep.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1,
    })
  }

  onFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggleModal}
      >
        <ReactWizard
          steps={steps}
          navSteps
          validate
          title="Create New Guide"
          description="Teach your users how to use your app using guides"
          headerTextCenter
          finishButtonClasses="btn-wd"
          nextButtonClasses="btn-wd"
          previousButtonClasses="btn-wd"
        />
    </Modal>
    );
  }
}

export default NewGuideModal;

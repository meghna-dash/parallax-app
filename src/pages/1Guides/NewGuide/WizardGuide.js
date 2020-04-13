import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GuideStepper from './GuideStepper.js';
import Upload from './0Upload.jsx';
import Routes from './1Routes.jsx';
import Finish from './2Finish.jsx';

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

  showStep = () => {
    if(this.state.step === 0) {
      return (<Upload onFileChange={this.onFileChange}/>);
    }
    if(this.state.step === 1) {
      return (<Routes />);
    }
    if(this.state.step === 2) {
      return (<Finish />);
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggleModal}
        >
          <ModalHeader
            toggle={this.props.toggleModal}
          >
            Create New Guide
          </ModalHeader>
          <GuideStepper
            step={this.state.step}
          />
          <ModalBody>
            {this.showStep()}
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-icon"
              color="success"
              id="edit-tooltip"
              size="sm"
              type="button"
              onClick={this.nextStep}
            >
              <i className="fa fa-chevron-right" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NewGuideModal;

'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Stepper from '../../../components/Stepper/Stepper.js';

class GuideStepper extends Component {
  constructor() {
    super();
    this.state = {
      steps: [{
        title: 'Upload',
        onClick: (e) => {
          e.preventDefault()
          console.log('onClick', 1)
        }
      }, {
        title: 'Routes',
        onClick: (e) => {
          e.preventDefault()
          console.log('onClick', 2)
        }
      }, {
        title: 'Finish',
        onClick: (e) => {
          e.preventDefault()
          console.log('onClick', 3)
        }
      }],
    };
  }

  render() {
    const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };

    return (
      <div>
        <Stepper steps={ this.state.steps } activeStep={ this.props.step } />
        <div style={ buttonStyle } onClick={ this.onClickNext }>Next</div>
      </div>
    );
  }
};

export default GuideStepper;

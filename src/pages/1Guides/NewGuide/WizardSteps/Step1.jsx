import React from "react";
import classnames from "classnames";
import FileUpload from '../FileUpload';
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Wizard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h5 className="info-text">
          Start by uploading a video tutorial
        </h5>
        <div className="justify-content-center">
          <InputGroup className="justify-content-center">
            <FileUpload
              className="justify-content-center"
              onFileChange={this.props.onFileChange}
            />

          </InputGroup>
        </div>
      </>
    );
  }
}

export default Wizard;

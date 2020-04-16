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
    this.state = {
      title: "",
      titleState: "",
    };
    this.change = this.change.bind(this);
    this.verifyLength = this.verifyLength.bind(this);
  }

  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };

  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

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
          <InputGroup className="input-group-focus">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="nc-icon nc-single-02" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              name="title"
              placeholder="Guide Title"
              type="text"
              onChange={e => this.props.handleTitleChange(e)}
              onFocus={e => this.setState({ titleFocus: true })}
              onBlur={e => this.setState({ titleFocus: false })}
            />
          </InputGroup>
          <InputGroup className="input-group-focus">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="nc-icon nc-single-02" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              name="description"
              placeholder="Description"
              type="paragraph"
              onChange={e => this.props.handleDescriptionChange(e)}
              onFocus={e => this.setState({ titleFocus: true })}
              onBlur={e => this.setState({ titleFocus: false })}
            />
          </InputGroup>
        </div>
      </>
    );
  }
}

export default Wizard;

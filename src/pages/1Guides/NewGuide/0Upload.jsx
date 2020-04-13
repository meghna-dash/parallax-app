import React, { Component } from "react";
import FileUpload from './FileUpload';

class Upload extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        UPLOAD
        <FileUpload
          onFileChange={this.props.onFileChange}
        />
      </div>
    );
  }
}

export default Upload;

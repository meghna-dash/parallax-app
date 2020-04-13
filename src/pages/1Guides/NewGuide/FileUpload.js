import axios from 'axios';
import React, { Component } from 'react';

class FileUpload extends Component {
  constructor() {
    super();
  }

  onFileChange = event => {

      // Update the state
      this.setState({ selectedFile: event.target.files[0] });

    };

  fileData = () => {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.props.selectedFile ? this.props.selectedFile.name : ""}</p>
          <p>File Type: {this.props.selectedFile ? this.props.selectedFile.type : ""}</p>
          <p>
            Last Modified:{" "}
            {this.props.selectedFile ? this.props.selectedFile.lastModifiedDate.toDateString() : ""}
          </p>
        </div>
      );

  };

  render() {
    return (
      <div>
        <h3>
          Upload Tutorial Video
        </h3>
        <input
          type="file"
          onChange={this.props.onFileChange}
        />
      </div>
    );
  }
}

export default FileUpload;

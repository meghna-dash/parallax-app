import axios from 'axios';
import React, { Component } from 'react';

class FileUpload extends Component {
  constructor() {
    super();
  }

  onFileChange = event => {
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
      <input
        type="file"
        onChange={this.props.onFileChange}
      />
    );
  }
}

export default FileUpload;

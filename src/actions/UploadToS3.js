// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import Amplify from 'aws-amplify';
// import { Storage } from 'aws-amplify';
// import Button from '../components/Button';
// import Original from './Original';
//
// export default class UploadToS3 extends Component {
// 	constructor(props) {
// 	 	super(props);
//
// 		this.state = {
// 		    videoName: "",
// 		    videoFile: "",
// 		    response: "",
// 		    isFile: false,
// 		    processing: false,
// 		};
// 		this.upload = null;
// 		this.uploadToS3 = this.uploadToS3.bind(this);
// 	};
//
// 	uploadToS3() {
// 		localStorage.removeItem('video_name');
// 		console.log("upload called")
// 		console.log(this.upload.files[0])
// 		console.log(this.state.isFile)
// 		if (this.upload.files[0] != undefined && this.upload.files[0] != null)  {
// 			console.log("attempting upload")
// 			Storage.put(
// 				`old/${this.upload.files[0].name}`,
// 				this.upload.files[0],
//                 {
//                 	contentType: this.upload.files[0].type
//                 })
// 		      .then(result => {
// 		      	this.upload = null;
// 		        this.setState({ processing: true});
// 		        setTimeout(() => {
// 				  localStorage.setItem('video_name', this.state.videoName);
// 				}, 5000);
//
//
// 		        console.log("UPLOADED");
// 		        console.log(result);
// 		      })
// 		      .catch(err => {
// 		        this.setState({ response: `Cannot uploading file: ${err}` });
// 		        console.log(err);
// 		      });
// 		}
// 	}
//
// 	render() {
// 		if (this.state.processing) {
// 			return (
// 				<Original />
// 			);
//
// 		} else {
// 			return (
// 				<div>
// 					<h2> Upload a video to get started. </h2>
// 					<input
// 			          type="file"
// 			          style={{ display: "none" }}
// 			          ref={ref => (
// 			          		this.upload = ref
// 			          	)}
// 			          onChange={e =>
// 			            this.setState({
// 			              videoFile: this.upload.files[0],
// 			              videoName: this.upload.files[0].name
// 			            })
// 			          }
// 			        />
// 			        <input value={this.state.videoName} placeholder="Select file" />
// 			        <button
// 			          onClick={e => {
// 			            this.upload.value = null;
// 			            this.upload.click();
//
// 			          }}
// 			          loading={this.state.uploading}
// 			        >
// 			          Browse
// 			        </button>
//
// 			        <button onClick={e => {
// 			        				this.setState({
// 			            				isFile: true
// 			            			});
// 			        				this.uploadToS3()
// 			        }}> Upload File </button>
//
// 			        {!this.state.response && <div>{this.state.response}</div>}
// 				</div>
// 			);
// 		}
// 	}
// };

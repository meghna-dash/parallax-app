import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { Auth } from "aws-amplify";
import "./login.css";
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      organization: "",
      message: "",
      verificationCode: "",
      shouldVerify: false,
    };
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleOrganizationChange(event) {
    this.setState({
      organization: event.target.value
    })
  }

  async handleSignUp(event) {
    event.preventDefault();

    try {
      await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
      })
      this.setState({
        shouldVerify: true,
      })
    } catch (error) {
      this.setState({
        message: error.message,
      })
      // console.log(error.message);
    }
  }

  handleVerificationCodeChange(event) {
    this.setState({
      verificationCode: event.target.value
    })
  }

  async confirmNewUser(event) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(this.state.email, this.state.verificationCode)
      await Auth.signIn(this.state.email, this.state.password)
      .then(user => sessionStorage.setItem("userID", user.username))
      .then(() => this.props.history.push("/app/projects"))
      .then(() => this.putNewUserInDynamo());
    } catch (error) {
      // console.log(error.message);
    }
  }

  putNewUserInDynamo = async () => {
    try {
      await API.graphql(graphqlOperation(mutations.putUser,
        {
          pk: sessionStorage.getItem("userID"),
          sk: "user",
          projects: "none",
          currentProject: "Projects",
        }
      ))
    }
    catch (error) {
      // console.log('error', error);
    }
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  render() {
    return (
      <div className="register-page">
        <Container>
          <Row>
            <Col className="ml-auto" lg="5" md="5">
              <div className="info-area info-horizontal mt-5">
                <div className="icon icon-primary">
                  <i className="nc-icon nc-tv-2" />
                </div>
                <div className="description">
                  <h5 className="info-title">Stop struggling with unexpected user behavior.</h5>
                  <p className="description">
                  Users almost never think about your product the way you want them to, which causes significant drops in conversion, retention, and purchases. Blueriddle helps you avoid this with non-invasive, comprehensive product guides.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-primary">
                  <i className="nc-icon nc-html5" />
                </div>
                <div className="description">
                  <h5 className="info-title">Help your users with simple guides.</h5>
                  <p className="description">
                    Blueriddle lets you easily upload video guides that teach your users how to use your software. Identify what you want to teach your users, upload guides, and we will handle engaging your user.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-info">
                  <i className="nc-icon nc-atom" />
                </div>
                <div className="description">
                  <h5 className="info-title">Bring users closer to that 'aha!' moment.</h5>
                  <p className="description">
                    Blueriddle presents your users with video guides. They can select what they want to learn to do from a few options you have determined. Increase conversion, retention, and user satisfaction using Blueriddle guides.
                  </p>
                </div>
              </div>
            </Col>
            <Col className="mr-auto" lg="4" md="6">
              <Card className="card-signup text-center">
                <CardHeader>
                  <CardTitle tag="h4">Get started with Blueriddle.</CardTitle>
                  <p className="card-description">
                    Stop losing users to frustrating experiences. Sign up to get early access to Blueriddle today.
                  </p>
                  <p className="card-description">
                    {this.state.message}
                  </p>
                </CardHeader>
                <CardBody>
                  <Form action="" className="form" method="">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onChange={(e) => {this.handleEmailChange(e)}}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-circle-10" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        onChange={(e) => {this.handlePasswordChange(e)}}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-bank" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Organization"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => {this.handleOrganizationChange(e)}}
                      />
                    </InputGroup>

                    {this.state.shouldVerify ?
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-circle-10" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Verification Code"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => {this.handleVerificationCodeChange(e)}}
                        />
                      </InputGroup> :
                    null }

                  </Form>
                </CardBody>
                <CardFooter>
                  {this.state.shouldVerify ?
                    <Button
                      className="btn-round login-button"
                      color="info"
                      onClick={e => {this.confirmNewUser(e)}}
                    >
                      Verify
                    </Button> :
                    <Button
                      className="btn-round login-button"
                      onClick={e => {this.handleSignUp(e)}}
                    >
                      Get Started
                    </Button>
                  }
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage: `url(${require("../../assets/img/mountains.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "bottom"
          }}
        />
      </div>
    );
  }
}

export default Register;

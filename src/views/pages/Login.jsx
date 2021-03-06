import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";
import { Auth } from "aws-amplify";
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
      toDashboard: false,
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

  async handleSignIn(event) {
    event.preventDefault();

    try {
      await Auth.signIn(this.state.email, this.state.password)
      .then(user => sessionStorage.setItem("userID", user.username))
      .then(() => this.props.history.push("/app/guides"))
    } catch (error) {
      this.setState({
        message: error.message,
      })
    }
  }

  componentDidMount() {
    document.body.classList.toggle("login-page");
  }

  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  render() {
    return (
      <div className="login-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="5" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <h3 className="header text-center">Welcome back.</h3>
                      <p className="card-description" style={{ color: 'red', fontWeight: 'bold' }}>
                        {this.state.message}
                      </p>
                    </CardHeader>
                  </CardHeader>
                  <CardBody>
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
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        onChange={(e) => {this.handlePasswordChange(e)}}
                      />
                    </InputGroup>
                    <br />
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="btn-round mb-3 login-button"
                      onClick={e => {this.handleSignIn(e)}}
                    >
                      Log In
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
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

// export default withRouter(Login);
export default Login;

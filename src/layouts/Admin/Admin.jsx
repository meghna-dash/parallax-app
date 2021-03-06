import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import './admin.css';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      activeColor: "info",
      sidebarMini: false,
      projects: [],
      loaded: false
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    this.queryForUsersProjects();
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/app") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };

  async queryForUsersProjects() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getUser,
        {
          pk: sessionStorage.getItem("userID"),
          sk: "user"
        }
      ));
      this.setState({
        projects: response.data.getUser[0] ? response.data.getUser[0].projects : null
      });

      if(this.state.projects) {
        const currProjectID = response.data.getUser[0].projects[1] ? response.data.getUser[0].projects[1] : null;
        sessionStorage.setItem("projectID", currProjectID);

        const resp = await API.graphql(graphqlOperation(queries.getProject,
          {
            pk: currProjectID,
            sk: "project"
          }
        ));
        const project = resp.data.getProject[0] ? resp.data.getProject[0] : null;
        if(project) {
          sessionStorage.setItem("projectName", project.name);
        }
      }

      this.setState({
        loaded: true
      });
    }
    catch {
      // console.log(error);
    }
  }

  render() {
    return (
      <div className="wrapper mountains">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          projects={this.state.projects}
        />
        <div className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
          />
          { this.state.loaded &&
            <Switch style={{ backgroundColor: 'red'}}>
              {this.getRoutes(routes)}
            </Switch>
          }
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Admin;

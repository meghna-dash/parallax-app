import Analytics from "pages/0Analytics/Analytics.jsx";
import Guides from "pages/1Guides/Guides.jsx";
import Projects from "pages/Projects/Projects.jsx";
import Login from "views/pages/Login.jsx";
import Register from "views/pages/Register.jsx";

const routes = [
  {
    path: "/projects",
    name: "Projects",
    icon: "nc-icon nc-single-copy-04",
    component: Projects,
    layout: "/app"
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "nc-icon nc-layout-11",
    component: Analytics,
    layout: "/app"
  },
  {
    path: "/guides",
    name: "Guides",
    icon: "nc-icon nc-bullet-list-67",
    component: Guides,
    layout: "/app"
  },
  {
    collapse: true,
    name: "Account",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/sign-up",
        name: "Register",
        mini: "R",
        component: Register,
        layout: "/auth"
      },
    ]
  },
];

export default routes;

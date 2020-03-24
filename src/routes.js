import Sessions from "views/sessions/Sessions.jsx";
import Login from "views/pages/Login.jsx";
import Register from "views/pages/Register.jsx";

const routes = [
  {
    path: "/sessions",
    name: "Sessions",
    icon: "nc-icon nc-bullet-list-67",
    component: Sessions,
    layout: "/project"
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

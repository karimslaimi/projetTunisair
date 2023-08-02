import {Navigate, useRoutes} from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import Page1 from "../pages/Page1";
import {useSelector} from "react-redux";
import Login from "../pages/Login";
import Users from "../pages/Users";


function Router() {
  const isLoggedIn = useSelector((state: any) => state.userData.isAuthenticated);

  const routes = [
    {

      path: "/login",
      element: <Login/>
    },
    {
      path: "/",
      element: isLoggedIn ? <SideMenu/> : <Navigate to="/login"/>,
      children: [
        {
          path: "/",
          element: <Page1/>,
        },
        {
          path: "users",
          element: <Users/>,
        },
      ]
    },

  ];

  return useRoutes(routes);
}


export default Router;

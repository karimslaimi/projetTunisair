import {Navigate, useRoutes} from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import {useSelector} from "react-redux";
import Login from "../pages/Login";

interface RouterProps {
  isLoggedIn: boolean;
}
function isUserAuthenticated(){
  return useSelector((state: any) => state.isAuthenticated) ;
}
function Router() {
  const isLoggedIn = isUserAuthenticated();
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
          path: "page-2",
          element: <Page2/>,
        },
      ]
    },

  ];

  return useRoutes(routes);
}


export default Router;

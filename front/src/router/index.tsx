import {Navigate, useRoutes} from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import {useSelector} from "react-redux";
import Login from "../pages/Login";
import Users from "../pages/User-Module/Users";
import AddUser from "../pages/User-Module/AddUser";
import EditUser from "../pages/User-Module/EditUser";
import Dashboard from "../pages/Dashboard";
import Articles from "../pages/Article-Module/Articles";
import AddArticle from "../pages/Article-Module/AddArticle";
import EditArticle from "../pages/Article-Module/EditArticle";


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
          element: <Dashboard/>,
        },
        //region user
        {
          path: "/users",
          element: <Users/>,
        },
        {
          path: "/users/add",
          element: <AddUser/>,
        },
        {
          path: "/users/edit/:id",
          element: <EditUser/>
        },
        //endregion
        {
          path: "/articles",
          element: <Articles/>
        },
        {
          path: "/articles/add",
          element: <AddArticle/>
        },
        {
          path: "/articles/edit/:id",
          element: <EditArticle/>
        }

      ]
    },

  ];

  return useRoutes(routes);
}


export default Router;

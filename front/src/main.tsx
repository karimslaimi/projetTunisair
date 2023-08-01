import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {Provider, useSelector} from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import React from "react";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <Router />
    </Provider>
    <ScrollToTop />
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Paths from "./components/Paths";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

ReactDOM.render(
  <GlobalProvider>
    <BrowserRouter>
      <Paths />
    </BrowserRouter>
  </GlobalProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

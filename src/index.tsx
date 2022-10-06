import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import './index.css';
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
import ReactDOMClient from "react-dom/client";
import App from "./App";

const element = document.getElementById("root");
const root = element && ReactDOMClient.createRoot(element);
root?.render(<App />);

if (module.hot) {
  module.hot.accept("./App", () => {
    const UpdatedApp = require("./App").default;
    const element = document.getElementById("root");
    const root = element && ReactDOMClient.createRoot(element);

    root?.render(<UpdatedApp />);
  });
}
*/

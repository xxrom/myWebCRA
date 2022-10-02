console.log("Hello World3");

import React from "react";
//import ReactDOM from "react-dom";

//const Test = () => <div>Test</div>;

//ReactDOM.render(
//<React.StrictMode>
//<div>Test</div>
//</React.StrictMode>,
//document.getElementById("root")
//);

//import { createRoot } from "react-dom/client";
//import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import { Test } from "./Test";

//const root = ReactDOM.createRoot(document.getElementById("root"));
const element = document.getElementById("root");
const root = element && ReactDOMClient.createRoot(element);
root?.render(<Test />);

if (module.hot) {
  module.hot.accept("./Test", () => {
    const UpdatedApp = require("./Test").Test;
    const element = document.getElementById("root");
    const root = element && ReactDOMClient.createRoot(element);

    root?.render(<UpdatedApp />);
    //ReactDOM.render(<UpdatedApp />, document.getElementById("app"));
  });
}

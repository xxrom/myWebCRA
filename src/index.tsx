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

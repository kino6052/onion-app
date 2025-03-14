import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { EPage, TAppState } from "./types";
import { mapStateToAppProps } from "./root";
import { DEFAULT_STATE } from "./pages/Login/data";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const Component = () => {
  const [state, setState] = useState<TAppState>(DEFAULT_STATE);

  const props = mapStateToAppProps(state, (cb) => {
    setState(cb);
  });

  return <App {...props} />;
};

root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);

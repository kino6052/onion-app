import { App } from "./App";
import { getMapStateToProps } from "./logic";
import { mapStateToLoginPageProps } from "./pages/Login";
import { mapStateToNoteProps } from "./pages/Note";
import { mapStateToOntologyProps } from "./pages/Ontology";

export const mapStateToAppProps = getMapStateToProps({
  mapStateToLoginPageProps,
  mapStateToOntologyProps,
  mapStateToNoteProps,
});

import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

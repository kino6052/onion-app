import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { EPage } from "./types";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App
      pageProps={{
        buttonProps: {
          onClick: () => {
            console.log("clicked");
          },
        },
      }}
      pageType={EPage.Login}
    />
  </React.StrictMode>
);

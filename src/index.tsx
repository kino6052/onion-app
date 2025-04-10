import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { getStateManager } from "./dependencies/state/dev";
import { mapStateToAppProps } from "./root";
import { TAppState, TSetState } from "./types";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const useSharedState = () => {
  const [state, setState] = useState<TAppState>(getStateManager().getState());

  useEffect(() => {
    const subscription = getStateManager().subscribe((state) => {
      setState(state);
    });

    return subscription;
  }, []);

  return [state, setState] as [TAppState, TSetState<TAppState>];
};

const Component = () => {
  const [state, setState] = useSharedState();

  const props = mapStateToAppProps(state, setState);

  return <App {...props} />;
};

root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { App } from "./App";
import { mapStateToAppProps } from "./root";
import { DEFAULT_STATE } from "./pages/Login/data";
import { TAppProps, TAppState } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "App",
  component: () => {
    const [state, setState] = useState<TAppState>(DEFAULT_STATE);

    const props = mapStateToAppProps(state, (cb) => {
      setState(cb);
    });

    return <App {...props} />;
  },
} satisfies Meta<React.FC<{ props: TAppProps; state: TAppState }>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const _001Initial: Story = {};

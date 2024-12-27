import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TAppProps, TAppState } from "../../types";
import { mapStateToButtonProps } from "./components/Button";
import { DEFAULT_STATE } from "./data";
import { mapStateToProps } from "./logic";
import { LoginPage } from "./LoginPage";
import { TLoginProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Login/App",
  component: () => {
    const [state, setState] = useState<TAppState>(DEFAULT_STATE);

    const props = mapStateToProps({
      mapStateToButtonProps,
    })(state, (cb) => {
      console.warn({ state });
      setState(cb(state));
    });

    console.warn({ state });

    return <LoginPage {...(props.pageProps as TLoginProps)} />;
  },
} satisfies Meta<React.FC<{ props: TAppProps; state: TAppState }>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const _001Initial: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { EPage, TAppProps, TAppState } from "../../types";
import { mapStateToProps } from "./converter";
import { DEFAULT_STATE } from "./data";
import { LoginPage } from "./LoginPage";
import { TLoginProps } from "./types";
import { Button } from "../../components/Button";
import { useState } from "react";
import { wait } from "../../utils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Login/App",
  component: () => {
    const [state, setState] = useState<TAppState>(DEFAULT_STATE);

    const props = mapStateToProps({
      login: async () => {
        await wait(1000);

        return {
          error: "Error",
        };
      },
      ButtonComponent: Button,
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

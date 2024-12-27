import type { Meta, StoryObj } from "@storybook/react";
import { EPage, TAppProps, TAppState } from "../../types";
import { mapStateToButtonProps } from "./components/Button";
import { DEFAULT_STATE } from "./data";
import { LoginPage } from "./LoginPage";
import { TLoginProps } from "./types";
import { getMapStateToProps } from "./logic";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Login",
  component: ({ props }) => <LoginPage {...(props.pageProps as TLoginProps)} />,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<React.FC<{ props: TAppProps; state: TAppState }>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const _001Initial: Story = {
  args: {
    state: DEFAULT_STATE,
    props: getMapStateToProps({
      mapStateToButtonProps,
    })(DEFAULT_STATE, () => {}),
  },
};

const state002 = {
  pageType: EPage.Login,
  pageState: {
    isLoading: true,
  },
} satisfies TAppState;

export const _002Loading: Story = {
  args: {
    state: state002,
    props: getMapStateToProps({
      mapStateToButtonProps,
    })(state002, () => {}),
  },
};

const state003 = {
  pageType: EPage.Login,
  pageState: {
    isLoading: false,
    message: "Error",
  },
} satisfies TAppState;

export const _003Error: Story = {
  args: {
    state: state003,
    props: getMapStateToProps({
      mapStateToButtonProps,
    })(state003, () => {}),
  },
};

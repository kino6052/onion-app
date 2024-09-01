import { ChangeEventHandler } from "react";
import { TButtonProps } from "../Button/types";

export type TPromptProps = {
  title: string;
  textProps: {
    value: string;
    onChange: ChangeEventHandler;
    placeholder: string;
  };
  buttonProps: TButtonProps;
  description: string;
};

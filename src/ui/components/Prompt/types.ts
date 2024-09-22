import { ChangeEventHandler } from "react";
import { TButtonProps } from "../Button/types";

export type TPromptProps = {
  title: string;
  textProps: {
    value: string;
    onChange: (input: string) => void;
    placeholder: string;
    isDisabled: boolean;
  };
  buttonProps: TButtonProps;
  description: string;
};

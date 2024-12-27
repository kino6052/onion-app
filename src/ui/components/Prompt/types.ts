import { TButtonProps } from "../Button/types";

export type TPromptProps = {
  title: string;

  description: string;
  onBackgrounClick: () => void;
} & Partial<{
  textProps: {
    value: string;
    onChange: (input: string) => void;
    placeholder: string;
    isDisabled: boolean;
  };
}> & { buttonProps: TButtonProps } & Partial<{
    cancelButtonProps: TButtonProps;
  }> &
  Partial<{ isNotificationOnly: boolean }>;

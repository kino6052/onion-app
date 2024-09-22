import { ChangeEvent } from "react";
import { Button } from "../Button";
import "./styles.scss";
import { TPromptProps } from "./types";

export const Prompt: React.FC<TPromptProps> = ({
  title,
  textProps,
  buttonProps,
  description,
}) => {
  return (
    <div className={"prompt-component__wrapper"}>
      <div className={"prompt-component__container"}>
        <h2 className={"prompt-component__title"}>{title}</h2>
        {description && (
          <p className={"prompt-component__description"}>{description}</p>
        )}
        <textarea
          className={"prompt-component__input"}
          {...textProps}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            textProps.onChange(e.target.value);
          }}
        />
        <Button {...buttonProps} />
      </div>
    </div>
  );
};

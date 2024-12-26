import { PropsWithChildren } from "react";
import "./styles.scss";
import { TButtonProps } from "./types";

export const Button: React.FC<PropsWithChildren<TButtonProps>> = ({
  children,
  onClick,
  hasIcon,
  isDisabled,
}) => {
  return (
    <button
      className={["button-component", hasIcon && "has-icon"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={isDisabled}
    >
      {hasIcon && <span className="button-component__icon"></span>}
      {children}
    </button>
  );
};

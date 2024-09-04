import { PropsWithChildren } from "react";
import { Typography } from "../Typography";
import { ETypographyType } from "../Typography/constants";
import "./styles.scss";
import { TItemProps } from "./types";

export const Item: React.FC<PropsWithChildren<TItemProps>> = ({
  text,
  onClick,
  onMenuClick,
  children,
}) => {
  return (
    <div className="item-component-wrapper">
      <div className="item-component" onClick={onClick}>
        <span className="item-component__icon"></span>
        <Typography type={ETypographyType.Regular}>{text}</Typography>
        <span className="item-component__menu" onClick={onMenuClick}></span>
      </div>
      {children}
    </div>
  );
};

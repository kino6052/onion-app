import React, { PropsWithChildren } from "react";
import "./styles.scss";
import { THierarchicalItemProps, TItemProps } from "./types";
import { findFirst } from "../../utils";
import { Typography } from "../Typography";
import { ETypographyType } from "../Typography/constants";

export const HierarchicalItem: React.FC<
  PropsWithChildren<Omit<THierarchicalItemProps, "successors">>
> = ({ text, onClick, onMenuClick, indent, children }) => {
  return (
    <div
      className="item-component-wrapper"
      style={findFirst(
        [!!indent && { paddingLeft: 12, borderLeft: "1px dashed white" }],
        undefined
      )}
    >
      <div className="item-component" onClick={onClick}>
        <span className="item-component__icon"></span>
        <Typography type={ETypographyType.Regular}>{text}</Typography>
        <span className="item-component__menu" onClick={onMenuClick}></span>
      </div>
      {children}
    </div>
  );
};

import React, { PropsWithChildren, useEffect, useRef } from "react";
import { findFirst } from "../../utils";
import { Menu } from "../Menu";
import { Typography } from "../Typography";
import { ETypographyType } from "../Typography/constants";
import "./styles.scss";
import { THierarchicalItemProps } from "./types";

export const HierarchicalItem: React.FC<
  PropsWithChildren<Omit<THierarchicalItemProps, "successors">>
> = ({
  text,
  onClick,
  onMenuClick,
  indent,
  children,
  isCollapsed,
  menuProps,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  // TODO: Move into a HOC
  useEffect(() => {
    if (menuRef.current && itemRef.current) {
      const position = itemRef.current.getBoundingClientRect();
      const style = menuRef.current.style;
      style.position = "absolute";
      style.left = `${Math.min(window.screen.width - position.x, window.screen.width - position.width)}px`;
      style.top = `${position.y}px`;
    }
  }, [menuRef, itemRef]);

  return (
    <div
      className="item-component-wrapper"
      style={findFirst(
        [!!indent && { paddingLeft: 12, borderLeft: "1px dashed white" }],
        undefined
      )}
    >
      {menuProps.isOpen && <Menu {...menuProps} ref={menuRef} />}
      <div className="item-component" onClick={onClick}>
        <span className="item-component__icon"></span>
        <Typography type={ETypographyType.Regular}>{text}</Typography>
        <span
          className="item-component__menu"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick();
          }}
          ref={itemRef}
        ></span>
      </div>
      {findFirst([!isCollapsed && children, null])}
    </div>
  );
};

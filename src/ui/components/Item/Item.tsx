import { PropsWithChildren, useEffect, useRef } from "react";
import { Typography } from "../Typography";
import { ETypographyType } from "../Typography/constants";
import "./styles.scss";
import { TItemProps } from "./types";
import { useMenuRefs } from "../Menu/utils/useMenuRefs";

export const Item: React.FC<PropsWithChildren<TItemProps>> = ({
  text,
  onClick,
  onMenuClick,
  children,
  menuProps,
}) => {
  const { menuButtonRef, menuRef } = useMenuRefs();

  return (
    <div className="item-component-wrapper">
      <div
        className="item-component"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <span className="item-component__icon"></span>
        <Typography type={ETypographyType.Regular}>{text}</Typography>
        {menuProps && (
          <span
            className="item-component__menu"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick?.();
            }}
            ref={menuButtonRef}
          >
            {menuProps.isOpen && menuProps.Component && (
              // @ts-expect-error TODO: Add ref type support
              <menuProps.Component {...menuProps} ref={menuRef} />
            )}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

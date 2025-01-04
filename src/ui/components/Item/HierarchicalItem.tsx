import React from "react";
import { findFirst } from "../../../utils";
import { useMenuRefs } from "../Menu/utils/useMenuRefs";
import { Prompt } from "../Prompt";
import { Typography } from "../Typography";
import { ETypographyType } from "../Typography/constants";
import "./styles.scss";
import { THierarchicalItemProps } from "./types";

export const HierarchicalItem: React.FC<THierarchicalItemProps> = ({
  text,
  onClick,
  onMenuClick,
  indent,
  isCollapsed,
  menuProps,
  promptProps,
  successors,
}) => {
  const { menuButtonRef, menuRef } = useMenuRefs();

  return (
    <>
      <div
        className="item-component-wrapper"
        style={findFirst(
          [
            !!indent && {
              paddingLeft: 12,
              borderLeft: "1px dashed white",
              width: `calc(100% - ${12 * indent}px)`,
            },
          ],
          undefined
        )}
      >
        {menuProps && menuProps?.Component && (
          // @ts-expect-error add ref type support
          <menuProps.Component {...menuProps} ref={menuRef} />
        )}
        <div
          className="item-component"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {menuProps && <span className="item-component__icon"></span>}
          <Typography type={ETypographyType.Regular}>
            {text} {isCollapsed ? "(...)" : ""}
          </Typography>
          <span
            className="item-component__menu"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick?.();
            }}
            ref={menuButtonRef}
          ></span>
        </div>
        {!isCollapsed &&
          successors &&
          successors.map((successorProps) => (
            <HierarchicalItem {...successorProps} />
          ))}
      </div>
      {promptProps && <Prompt {...promptProps} />}
    </>
  );
};

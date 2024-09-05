import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { Item } from "../Item";
import "./styles.scss";
import { TMenuProps } from "./types";

export const Menu = forwardRef<HTMLDivElement, TMenuProps>(
  ({ itemsProps, onBackgroundClick }, ref) => {
    return createPortal(
      <div className={"menu-component__wrapper"} onClick={onBackgroundClick}>
        <div className={"menu-component"} ref={ref}>
          {itemsProps.map((props) => (
            <Item {...props} />
          ))}
        </div>
      </div>,
      document.body
    );
  }
);

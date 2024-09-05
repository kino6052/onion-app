import { forwardRef, PropsWithRef } from "react";
import { Item } from "../Item";
import "./styles.scss";
import { TMenuProps } from "./types";
import { createPortal } from "react-dom";

export const Menu: React.FC<PropsWithRef<TMenuProps>> = forwardRef(
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

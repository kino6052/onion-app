import { forwardRef } from "react";
import { Item } from "../Item";
import "./styles.scss";
import { TMenuProps } from "./types";

export const Menu = forwardRef<HTMLDivElement, TMenuProps>(
  ({ itemsProps, onBackgroundClick }, ref) => {
    return (
      <div className={"menu-component__wrapper"} onClick={onBackgroundClick}>
        <div className={"menu-component"} ref={ref}>
          {itemsProps.map((props) => (
            <Item {...props} />
          ))}
        </div>
      </div>
    );
  }
);

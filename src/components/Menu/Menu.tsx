import { Item } from "../Item";
import "./styles.scss";
import { TMenuProps } from "./types";

export const Menu: React.FC<TMenuProps> = ({ itemsProps }) => {
  return (
    <div className={"menu-component"}>
      {itemsProps.map((props) => (
        <Item {...props} />
      ))}
    </div>
  );
};

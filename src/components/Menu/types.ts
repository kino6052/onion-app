import { TWithComponent } from "../../types";
import { TItemProps } from "../Item/types";

export type TMenuPropsBase = {
  id: string;
  itemsProps: TItemProps[];
  onBackgroundClick: () => void;
  isOpen?: boolean;
};

export type TMenuProps = TMenuPropsBase & TWithComponent<TMenuPropsBase>;

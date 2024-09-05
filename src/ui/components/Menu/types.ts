import { TItemProps } from "../Item/types";

export type TMenuProps = {
  itemsProps: TItemProps[];
  onBackgroundClick: () => void;
  isOpen?: boolean;
};

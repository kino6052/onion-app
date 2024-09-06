import { TItemProps } from "../Item/types";

export type TMenuProps = {
  id: string;
  itemsProps: TItemProps[];
  onBackgroundClick: () => void;
  isOpen?: boolean;
  MenuComponent?: React.FC<TMenuProps>;
};

export type TItemProps = {
  text: string;
  indent: number;
  id: string;
  successors: string[];
  isCollapsed: boolean;
  onClick: () => void;
  onMenuClick: () => void;
};

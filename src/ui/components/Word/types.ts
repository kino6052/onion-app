export type TWordProps = {
  id: string;
  onClick: () => void;
  onMenuClick: () => void;
  isCollapsible: boolean;
  childrenProps: (string | TWordProps)[];
};

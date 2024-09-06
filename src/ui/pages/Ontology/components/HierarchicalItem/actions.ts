import { EPage, TAppProps } from "../../../../types";

export const toggleCollapseItem = (id: string) => (_state: TAppProps) => {
  if (_state.pageType !== EPage.Ontology) return;
  const node = _state.tree[id];
  const isCollapsed = node.isCollapsed;
  node.isCollapsed = !isCollapsed;
};

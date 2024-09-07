import { getUpdateState } from "../../utils";
import { HierarchicalItem } from "./components/HierarchicalItem";
import { TOntologyProps } from "./types";

export const converter = (props: TOntologyProps): TOntologyProps => {
  return getUpdateState(props)((_props) => {
    _props.ItemComponent = HierarchicalItem;
  });
};

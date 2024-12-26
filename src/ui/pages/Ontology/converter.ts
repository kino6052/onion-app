import { HierarchicalItem } from "../../components/Item";
import { EPage, TAppProps, TAppState } from "../../types";
import { getUpdateState, noop } from "../../utils";
import { TOntologyProps } from "./types";
import { createTree } from "./utils";

export const mapStateToProps = (
  state: TAppState,
  setState: (cb: (state: TAppState) => TAppState) => void
): TAppProps => {
  if (state.pageType !== EPage.Ontology) {
    throw Error("Invalid page type");
  }

  return {
    pageProps: {
      isLoading: state.pageState.isLoading,
      menuProps: {
        id: "menu",
        onClick: noop,
        onMenuClick: noop,
        text: "Menu",
      },
      pageType: EPage.Ontology,
      hierarchicalItemProps: createTree(state.pageState.tree),
    },
    pageType: EPage.Ontology,
  };
};

export const converter = (props: TOntologyProps): TOntologyProps => {
  return getUpdateState(props)((_props) => {
    _props.ItemComponent = HierarchicalItem;
  });
};

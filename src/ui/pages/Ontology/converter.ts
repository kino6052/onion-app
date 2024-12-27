import { HierarchicalItem } from "../../components/Item";
import { Menu } from "../../components/Menu/Menu";
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
    pageType: EPage.Ontology,
    pageProps: {
      buttonProps: {
        onClick: noop,
        children: "Text",
        hasIcon: false,
      },

      isLoading: state.pageState.isLoading,
      notificationProps: state.pageState.hasError
        ? {
            buttonProps: {
              onClick: noop,
              children: "OK",
            },
            description: state.pageState.message ?? "An error occurred",
            onBackgrounClick: noop,
            title: "Error",
            isNotificationOnly: true,
          }
        : undefined,

      hierarchicalItemProps: createTree(state.pageState.tree),
      menuProps: {
        id: "menu",
        onClick: noop,
        onMenuClick: noop,
        text: "Text",
        menuProps: {
          isOpen: state.pageState.isMenuOpen,
          Component: Menu,
          id: "menu",
          itemsProps: [
            {
              id: "ontology",
              text: "Ontology",
              onClick: noop,
              onMenuClick: noop,
            },
          ],
          onBackgroundClick: noop,
        },
      },
    },
  };
};

export const converter = (props: TOntologyProps): TOntologyProps => {
  return getUpdateState(props)((_props) => {
    _props.ItemComponent = HierarchicalItem;
  });
};

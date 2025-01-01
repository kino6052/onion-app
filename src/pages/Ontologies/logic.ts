import { noop } from "lodash";
import { TItemProps } from "../../components/Item/types";
import { TMenuProps } from "../../components/Menu/types";
import { FC } from "../../libs/react";
import {
  EPage,
  TAppState,
  TMapStateToProps,
  TOntologiesPageProps,
  TOntologiesPageState,
  TSetState,
} from "../../types";
import { EMenuConstant } from "../Note/components/Word/types";

const handleMenuClick = (setState: TSetState<TAppState>) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        isMenuOpen: !prevState.pageState.isMenuOpen,
      },
    };
  });
};

const handleAddClick = (setState: TSetState<TAppState>) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        list: [
          ...prevState.pageState.list,
          { id: `new-${Date.now()}`, text: "New Ontology" },
        ],
        isMenuOpen: false,
      },
    };
  });
};

const handleRenameClick = (setState: TSetState<TAppState>, itemId: string) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        list: prevState.pageState.list.map((item) => {
          if (item.id !== itemId) return item;

          return {
            ...item,
            isMenuOpen: false,
            promptState: {
              text: item.text,
            },
          };
        }),
      },
    };
  });
};

const handleRemoveClick = (setState: TSetState<TAppState>, itemId: string) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        isMenuOpen: false,
        list: prevState.pageState.list.map((item) => {
          if (item.id !== itemId) return item;

          return {
            ...item,
            promptState: {
              ...item.promptState,
              isNotificationOnly: true,
              type: "remove",
            },
          };
        }),
      },
    };
  });
};

const handlePromptApplyClick = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        list: prevState.pageState.list
          .map((item) => {
            if (item.promptState?.type === "remove") return undefined;
            if (item.id !== itemId) return item;

            return {
              ...item,
              promptState: undefined,
              text: item.promptState?.text ?? "",
            };
          })
          .filter(Boolean),
      },
    };
  });
};

const handlePromptCancelClick = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        list: prevState.pageState.list
          .map((item) => {
            if (item.id !== itemId) return item;

            return {
              ...item,
              promptState: undefined,
            };
          })
          .filter(Boolean),
      },
    };
  });
};

const handlePromptChange = (
  setState: TSetState<TAppState>,
  itemId: string,
  value: string
) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontologies)
      throw new Error("Not the right page");

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        list: prevState.pageState.list.map((item) => {
          if (item.id !== itemId) return item;

          return {
            ...item,
            promptState: {
              text: value,
            },
          };
        }),
      },
    };
  });
};

const createMenuProps = (
  setState: TSetState<TAppState>,
  dependencies: { Menu: FC<TMenuProps> },
  state: TOntologiesPageState
) => ({
  id: "menu",
  onClick: () => handleMenuClick(setState),
  text: "Menu",
  menuProps: {
    id: "menu",
    itemsProps: [
      {
        id: EMenuConstant.Add,
        onClick: () => handleAddClick(setState),
        text: "Add",
      },
    ],
    Component: dependencies.Menu,
    onBackgroundClick: () => handleMenuClick(setState),
    isOpen: state.pageState.isMenuOpen,
  },
  onMenuClick: () => handleMenuClick(setState),
});

const createItemMenuProps = (
  setState: TSetState<TAppState>,
  dependencies: { Menu: FC<TMenuProps> },
  item: any
) => ({
  id: "menu",
  itemsProps: [
    {
      id: EMenuConstant.Rename,
      onClick: () => handleRenameClick(setState, item.id),
      text: "Rename",
    },
    {
      id: EMenuConstant.Remove,
      onClick: () => handleRemoveClick(setState, item.id),
      text: "Remove",
    },
  ],
  Component: dependencies.Menu,
  onBackgroundClick: () => handleMenuClick(setState),
  isOpen: item.isMenuOpen,
});

const createItemPromptProps = (setState: TSetState<TAppState>, item: any) =>
  !item.promptState
    ? undefined
    : {
        isNotificationOnly: !!item.promptState.isNotificationOnly,
        buttonProps: {
          onClick: () => handlePromptApplyClick(setState, item.id),
          children: "Apply",
        },
        title: item.promptState.type === "remove" ? "Remove" : "Rename",
        textProps: {
          isDisabled: false,
          onChange: (value) => handlePromptChange(setState, item.id, value),
          placeholder: "Placeholder",
          value: item.promptState?.text ?? "",
        },
        cancelButtonProps: {
          onClick: () => handlePromptCancelClick(setState, item.id),
          children: "Cancel",
        },
      };

const createOntologiesProps = (
  setState: TSetState<TAppState>,
  dependencies: { Menu: FC<TMenuProps> },
  state: TOntologiesPageState
) =>
  state.pageState.list.map(
    (item) =>
      ({
        ...item,
        menuProps: createItemMenuProps(setState, dependencies, item),
        onClick: noop,
        onMenuClick: () => {
          setState((prevState) => {
            if (prevState.pageType !== EPage.Ontologies)
              throw new Error("Not the right page");

            return {
              ...prevState,
              pageState: {
                ...prevState.pageState,
                list: prevState.pageState.list.map((_item) => {
                  if (item.id !== _item.id) return _item;

                  return {
                    ..._item,
                    isMenuOpen: !_item.isMenuOpen,
                  };
                }),
              },
            };
          });
        },
        promptProps: createItemPromptProps(setState, item),
      }) as TItemProps
  );

export const getMapStateToOntologiesProps =
  (dependencies: {
    Menu: FC<TMenuProps>;
  }): TMapStateToProps<TOntologiesPageState, TOntologiesPageProps> =>
  (state, setState) => ({
    pageProps: {
      isLoading: state.pageState.isLoading,
      menuProps: createMenuProps(setState, dependencies, state),
      ontologiesProps: createOntologiesProps(setState, dependencies, state),
    },
    pageType: EPage.Ontologies,
  });

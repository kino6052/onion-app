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

export const getMapStateToOntologiesProps =
  (dependencies: {
    Menu: FC<TMenuProps>;
  }): TMapStateToProps<TOntologiesPageState, TOntologiesPageProps> =>
  (state, setState) => ({
    pageProps: {
      isLoading: state.pageState.isLoading,
      menuProps: {
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
      },
      ontologiesProps: state.pageState.list.map(
        (item) =>
          ({
            ...item,
            menuProps: {
              id: "menu",
              itemsProps: [
                {
                  id: EMenuConstant.Rename,
                  onClick: () => {
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
                              isMenuOpen: false,
                              promptState: {
                                text: _item.text,
                              },
                            };
                          }),
                        },
                      };
                    });
                  },
                  text: "Rename",
                },
                {
                  id: EMenuConstant.Remove,
                  onClick: () => {
                    setState((prevState) => {
                      if (prevState.pageType !== EPage.Ontologies)
                        throw new Error("Not the right page");

                      return {
                        ...prevState,
                        pageState: {
                          ...prevState.pageState,
                          isMenuOpen: false,
                          list: prevState.pageState.list.map((_item) => {
                            if (item.id !== _item.id) return _item;

                            return {
                              ..._item,
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
                  },
                  text: "Remove",
                },
              ],
              Component: dependencies.Menu,
              onBackgroundClick: () => handleMenuClick(setState),
              isOpen: item.isMenuOpen,
            },
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
            promptProps: !item.promptState
              ? undefined
              : {
                  isNotificationOnly: !!item.promptState.isNotificationOnly,
                  buttonProps: {
                    onClick: () => {
                      setState((prevState) => {
                        if (prevState.pageType !== EPage.Ontologies)
                          throw new Error("Not the right page");

                        return {
                          ...prevState,
                          pageState: {
                            ...prevState.pageState,
                            list: prevState.pageState.list
                              .map((_item) => {
                                if (_item.promptState?.type === "remove")
                                  return undefined;
                                if (item.id !== _item.id) return _item;

                                return {
                                  ..._item,
                                  promptState: undefined,
                                  text: _item.promptState?.text ?? "",
                                };
                              })
                              .filter(Boolean),
                          },
                        };
                      });
                    },
                    children: "Apply",
                  },
                  title:
                    item.promptState.type === "remove" ? "Remove" : "Rename",
                  textProps: {
                    isDisabled: false,
                    onChange: (value) => {
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
                                promptState: {
                                  text: value,
                                },
                              };
                            }),
                          },
                        };
                      });
                    },
                    placeholder: "Placeholder",
                    value: item.promptState?.text ?? "",
                  },
                  cancelButtonProps: {
                    onClick: () => {
                      setState((prevState) => {
                        if (prevState.pageType !== EPage.Ontologies)
                          throw new Error("Not the right page");

                        return {
                          ...prevState,
                          pageState: {
                            ...prevState.pageState,
                            list: prevState.pageState.list
                              .map((_item) => {
                                if (item.id !== _item.id) return _item;

                                return {
                                  ..._item,
                                  promptState: undefined,
                                };
                              })
                              .filter(Boolean),
                          },
                        };
                      });
                    },
                    children: "Cancel",
                  },
                },
          }) as TItemProps
      ),
    },
    pageType: EPage.Ontologies,
  });

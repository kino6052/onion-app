import { TItem, TItemProps } from "../../../components/Item/types";
import { EMenuConstant } from "../../../components/Menu/constants";
import { TMenuProps } from "../../../components/Menu/types";
import { FC } from "../../../libs/react";
import {
  EPage,
  TAppState,
  TOntologiesPageState,
  TOntologyPageState,
  TSetState,
} from "../../../types";
import { setPartial } from "../../../utils/setPartial";
import { TOntologiesDependencies } from "../types";

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
              text: item.promptState?.text ?? "",
              isNotificationOnly: true,
              type: "remove",
            },
          };
        }),
      },
    };
  });
};

const handleBackgroundClick = (
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
        isMenuOpen: false,
        list: prevState.pageState.list.map((item) => {
          if (item.id !== itemId) return item;

          return {
            ...item,
            isMenuOpen: false,
          };
        }),
      },
    };
  });
};

const handlePromptApplyClick = (
  setState: TSetState<TAppState>,
  itemId: string,
  dependencies: TOntologiesDependencies
) => {
  dependencies
    .removeOntology(itemId)
    .then(() => {
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
              .filter(Boolean) as TItem[],
          },
        };
      });
    })
    .catch((error) => {
      setPartial(
        {
          pageState: {
            hasError: true,
            message: error.message,
          },
        },
        setState,
        EPage.Ontologies
      );
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
  onBackgroundClick: () => handleBackgroundClick(setState, item.id),
  isOpen: item.isMenuOpen,
});

const createItemPromptProps = (
  setState: TSetState<TAppState>,
  item: any,
  dependencies: TOntologiesDependencies
) =>
  !item.promptState
    ? undefined
    : {
        isNotificationOnly: !!item.promptState.isNotificationOnly,
        buttonProps: {
          onClick: () =>
            handlePromptApplyClick(setState, item.id, dependencies),
          children: "Apply",
        },
        title: item.promptState.type === "remove" ? "Remove" : "Rename",
        textProps: {
          isDisabled: false,
          onChange: (value: string) =>
            handlePromptChange(setState, item.id, value),
          placeholder: "Placeholder",
          value: item.promptState?.text ?? "",
        },
        cancelButtonProps: {
          onClick: () => handlePromptCancelClick(setState, item.id),
          children: "Cancel",
        },
      };

const onOntologyMenuClick = (
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
        list: prevState.pageState.list.map((item) => {
          if (item.id !== itemId) return item;

          return {
            ...item,
            isMenuOpen: !item.isMenuOpen,
          };
        }),
      },
    };
  });
};

export const createOntologiesProps = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies,
  state: TOntologiesPageState
) =>
  state.pageState.list.map(
    (item) =>
      ({
        ...item,
        menuProps: createItemMenuProps(setState, dependencies, item),
        onClick: () => {
          dependencies.getOntology(item.id).then((result) => {
            setState(
              () =>
                ({
                  pageState: {
                    id: item.id,
                    isLoading: false,
                    tree: result,
                  },
                  pageType: EPage.Ontology,
                }) satisfies TOntologyPageState
            );
          });
        },
        onMenuClick: () => onOntologyMenuClick(setState, item.id),
        promptProps: createItemPromptProps(setState, item, dependencies),
      }) as TItemProps
  );

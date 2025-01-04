import { EPage, TAppState, TSetState } from "../../../../types";
import { setPartial } from "../../../utils/setPartial";
import { setIsLoading } from "../../../utils/utils";
import { TExtendedItem, TOntologiesDependencies } from "../types";

const handleRemove = (
  dependencies: TOntologiesDependencies,
  itemId: string,
  setState: TSetState<TAppState>
) => {
  return dependencies
    .removeOntology(itemId)
    .then(() => {
      setIsLoading(false, setState, EPage.Ontologies);
    })
    .catch((error) => {
      setPartial(
        {
          pageState: {
            hasError: true,
            message: error.message,
            isLoading: false,
          },
        },
        setState,
        EPage.Ontologies
      );
    });
};

const handleSave = (
  dependencies: TOntologiesDependencies,
  itemId: string,
  setState: TSetState<TAppState>,
  item: TExtendedItem
) => {
  return dependencies
    .saveOntology(
      itemId,
      {
        name: item.promptState?.text ?? "",
      },
      true
    )
    .finally(() => {
      setIsLoading(false, setState, EPage.Ontologies);
    });
};

export const handlePromptApplyClick = (
  setState: TSetState<TAppState>,
  item: TExtendedItem,
  dependencies: TOntologiesDependencies
) => {
  setIsLoading(true, setState, EPage.Ontologies);

  if (item.promptState?.type === "remove") {
    handleRemove(dependencies, item.id, setState).then(() => {
      setState((prevState) => {
        if (prevState.pageType !== EPage.Ontologies)
          throw new Error("Not the right page");

        return {
          ...prevState,
          pageState: {
            ...prevState.pageState,
            list: prevState.pageState.list
              .map((_item) => (_item.id === item.id ? undefined : _item))
              .filter(Boolean) as TExtendedItem[],
          },
        };
      });
    });
    return;
  }

  handleSave(dependencies, item.id, setState, item)
    .then(() => {
      setState((prevState) => {
        if (prevState.pageType !== EPage.Ontologies)
          throw new Error("Not the right page");

        return {
          ...prevState,
          pageState: {
            ...prevState.pageState,
            list: prevState.pageState.list.map((_item) =>
              _item.id === item.id
                ? {
                    ..._item,
                    promptState: undefined,
                    text: item.promptState?.text ?? "",
                  }
                : _item
            ),
          },
        };
      });
    })
    .finally(() => {
      setIsLoading(false, setState, EPage.Ontologies);
    });
};

import { EConstant } from "../../../../constants";
import { TMenuProps } from "../../../components/Menu/types";
import { TGetOntology } from "../../../dependencies/getOntology/types";
import { FC } from "../../../libs/react";
import { EPage, TAppState, TNotePageState, TSetState } from "../../../../types";
import { noop } from "../../../../utils";
import { setPartial } from "../../../utils/setPartial";
import { EMenuConstant } from "../../../components/Menu/constants";
import { TNoteDependencies } from "../types";

export const handleMenuClick = (
  id: string,
  _wordTree: Record<string, any>,
  setState: TSetState<TAppState>
) => {
  setPartial(
    {
      pageType: EPage.Note,
      pageState: {
        wordTree: {
          ..._wordTree,
          [id]: {
            ..._wordTree[id],
            isCollapsed: !_wordTree[id].isCollapsed,
            range: [null, null],
            isEditing: false,
            editedName: undefined,
          },
        },
      },
    },
    setState,
    EPage.Note
  );
};

export const handleItemMenuClick = (setState: TSetState<TAppState>) => {
  setPartial(
    {
      pageState: {
        isMenuOpen: true,
      },
    },
    setState,
    EPage.Note
  );
};

export const handleGoBackClick = (
  id: string,
  setState: TSetState<TAppState>,
  getOntology: TGetOntology
) => {
  setPartial(
    {
      pageState: {
        isLoading: true,
      },
    },
    setState,
    EPage.Note
  );

  getOntology(id)
    .then((tree) => {
      setState((prev) => ({
        pageState: {
          id,
          isLoading: false,
          tree,
        },
        pageType: EPage.Ontology,
      }));
    })
    .catch((e) => {
      setPartial(
        {
          pageState: {
            hasError: true,
            message: e.message,
          },
        },
        setState,
        EPage.Note
      );
    });
};

export const getMapStateToItemProps =
  ({ getOntology, MenuComponent, saveNote }: TNoteDependencies) =>
  (state: TNotePageState, setState: TSetState<TAppState>) => ({
    id: state.pageState.id,
    onClick: noop,
    onMenuClick: () => handleItemMenuClick(setState),
    text: "Test",
    menuProps: {
      id: "menu",
      Component: MenuComponent,
      itemsProps: [
        {
          id: EMenuConstant.GoBack,
          onClick: () =>
            handleGoBackClick(
              state.pageState.ontologyId,
              setState,
              getOntology
            ),
          text: "Go back",
        },
        {
          id: EMenuConstant.Save,
          onClick: () => {
            setPartial(
              {
                pageState: {
                  isLoading: true,
                },
              },
              setState,
              EPage.Note
            );

            saveNote(
              state.pageState.id,
              state.pageState.ontologyId,
              state.pageState.wordTree,
              true
            ).then(() => {
              setPartial(
                {
                  pageState: {
                    isLoading: false,
                  },
                },
                setState,
                EPage.Note
              );
            });
          },
          text: "Save",
        },
        {
          id: EMenuConstant.Edit,
          onClick: () => {
            setPartial(
              {
                pageState: {
                  isMenuOpen: false,
                  textEditPrompt: {
                    text: state.pageState.wordTree[EConstant.Root].open ?? "",
                  },
                },
              },
              setState,
              EPage.Note
            );
          },
          text: "Edit text",
        },
      ],
      onBackgroundClick: noop,
      isOpen: state.pageState.isMenuOpen,
    },
  });

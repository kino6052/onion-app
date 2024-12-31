import { Menu } from "../../../components/Menu";
import { TGetOntology } from "../../../dependencies/getOntology/types";
import { EPage, TAppState, TNotePageState, TSetState } from "../../../types";
import { noop } from "../../../utils";
import { setPartial } from "../../../utils/setPartial";
import { EMenuConstant } from "../components/Word/types";

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

export const handleEditClick = (
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
  getOntology()
    .then((tree) => {
      setState((prev) => ({
        pageState: {
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
  ({ getOntology }: { getOntology: TGetOntology }) =>
  (state: TNotePageState, setState: TSetState<TAppState>) => ({
    id: state.pageState.id,
    onClick: noop,
    onMenuClick: () => handleItemMenuClick(setState),
    text: "Test",
    menuProps: {
      id: "menu",
      Component: Menu,
      itemsProps: [
        {
          id: EMenuConstant.GoBack,
          onClick: () => handleEditClick(setState, getOntology),
          text: "Go back",
        },
      ],
      onBackgroundClick: noop,
      isOpen: state.pageState.isMenuOpen,
    },
  });

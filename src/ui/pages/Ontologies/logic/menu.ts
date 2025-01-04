import { EMenuConstant } from "../../../components/Menu/constants";
import { EConstant } from "../../../../constants";
import {
  EPage,
  TAppState,
  TOntologiesPageState,
  TSetState,
} from "../../../../types";
import { TOntologiesDependencies } from "../types";
import { setIsLoading } from "../../../utils/utils";

export const handleMenuClick = (setState: TSetState<TAppState>) => {
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

export const handleAddClick = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies
) => {
  const newOntology = {
    id: dependencies.getUniqueId(),
    text: "New Ontology",
  };

  setIsLoading(true, setState, EPage.Ontologies);

  dependencies
    .saveOntology(newOntology.id, {
      name: newOntology.text,
      map: {
        [EConstant.Root]: {
          id: EConstant.Root,
          isCollapsed: false,
          isMenuOpen: false,
          successors: [],
          text: "New Ontology",
        },
      },
    })
    .then(() => {
      setState((prevState) => {
        if (prevState.pageType !== EPage.Ontologies)
          throw new Error("Not the right page");

        return {
          ...prevState,
          pageState: {
            ...prevState.pageState,
            isLoading: false,
            list: [
              ...prevState.pageState.list,
              {
                id: newOntology.id,
                text: newOntology.text,
              },
            ],
            isMenuOpen: false,
          },
        };
      });
    })
    .catch(() => {
      setIsLoading(false, setState, EPage.Ontologies);
    });
};

export const createMenuProps = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies,
  state: TOntologiesPageState
) => {
  return {
    id: "menu",
    onClick: () => {},
    text: "Menu",
    menuProps: {
      id: "menu",
      itemsProps: [
        {
          id: EMenuConstant.Add,
          onClick: () => handleAddClick(setState, dependencies),
          text: "Add",
        },
        {
          id: EMenuConstant.Logout,
          onClick: () => {
            dependencies.logout().then(() => {
              setState((prev) => ({
                pageState: {
                  id: "",
                  isLoading: false,
                },
                pageType: EPage.Login,
              }));
            });
          },
          text: "Logout",
        },
      ],
      Component: dependencies.Menu,
      onBackgroundClick: () => handleMenuClick(setState),
      isOpen: state.pageState.isMenuOpen,
    },
    onMenuClick: () => handleMenuClick(setState),
  };
};

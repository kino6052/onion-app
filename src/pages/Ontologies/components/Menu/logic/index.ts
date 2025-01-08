import { logout } from "../../../../../logic/logout.useCase";
import {
  TAppState,
  TOntologiesPageState,
  TSetState,
} from "../../../../../types";
import { EMenuConstant } from "../../../../../components/Menu/constants";
import { openMenu } from "../../../../../components/Menu/menu.domain";
import { createNewOntology } from "../../Item/logic/createOntology.case";
import { TOntologiesDependencies } from "../../../types";

export const mapStateToMenuProps = (
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
          onClick: () => createNewOntology(setState, dependencies),
          text: "Add",
        },
        {
          id: EMenuConstant.Logout,
          onClick: () => logout(setState, dependencies),
          text: "Logout",
        },
      ],
      Component: dependencies.Menu,
      onBackgroundClick: () => openMenu(setState),
      isOpen: state.pageState.isMenuOpen,
    },
    onMenuClick: () => openMenu(setState),
  };
};

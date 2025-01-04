import { EConstant } from "../../../../../constants";
import { TMenuProps } from "../../../../components/Menu/types";
import { FC } from "../../../../libs/react";
import { EPage, TAppState } from "../../../../../types";
import { getComposeActions } from "../../../../utils/composeActions";
import { StateManager } from "../../../../utils/stateManager";
import { getMapStateToProps } from "../../logic";
import { getMapStateToItemProps } from "../../logic/menu";
import { saveNote } from "../../../../dependencies/saveNote/check";

export const setup = () => {
  const initialState: TAppState = {
    pageType: EPage.Note,
    pageState: {
      isLoading: false,
      ontologyId: "id",
      wordTree: {
        [EConstant.Root]: {
          id: EConstant.Root,
          closed: EConstant.Root,
          open: "This is a test note.",
        },
      },
      id: "test",
    },
  };

  const stateManager = new StateManager<TAppState<EPage.Note>>(initialState);

  let counter = 0;

  const mapStateToButtonProps = getMapStateToProps({
    getUniqueId: () => {
      counter += 1;
      return `${counter}`;
    },
    mapStateToItemProps: getMapStateToItemProps({
      getOntology: () => Promise.resolve({}),
      MenuComponent: (() => ({})) as unknown as FC<TMenuProps>,
      saveNote,
    }),
  });

  const composeActions = getComposeActions(() =>
    mapStateToButtonProps(
      stateManager.getState(),
      // @ts-expect-error
      stateManager.setState.bind(stateManager)
    )
  );

  return { stateManager, mapStateToButtonProps, composeActions };
};

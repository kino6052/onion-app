import { EConstant } from "../../../../../../constants";
import { TMenuProps } from "../../../../../../components/Menu/types";
import { EPage, TAppState } from "../../../../../../types";
import { getComposeActions } from "../../../../../../utils/composeActions";
import { StateManager } from "../../../../../../utils/stateManager";
import { TSerializedWord } from "../../../../../Note/types";
import { getInitialOntologyTree } from "../../../../utils";
import { getMapStateToProps } from "../../logic";

export const setup = () => {
  const initialState: TAppState<EPage.Ontology> = {
    pageType: EPage.Ontology,
    pageState: {
      isLoading: true,
      tree: getInitialOntologyTree(),
    },
  };

  const stateManager = new StateManager<TAppState<EPage>>(initialState);

  let counter = 0;

  const mapStateToButtonProps = getMapStateToProps({
    MenuComponent: {} as React.FC<TMenuProps>,
    getUniqueId: () => {
      counter += 1;
      return `${counter}`;
    },
    getNote: () => Promise.resolve({}),
  });

  const composeActions = getComposeActions(() =>
    mapStateToButtonProps(
      stateManager.getState(),
      stateManager.setState.bind(stateManager)
    )
  );

  return { stateManager, mapStateToButtonProps, composeActions };
};

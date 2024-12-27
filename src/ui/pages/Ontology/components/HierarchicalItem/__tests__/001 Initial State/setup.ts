import { TMenuProps } from "../../../../../../components/Menu/types";
import { EPage, TAppState } from "../../../../../../types";
import { StateManager } from "../../../../../../utils/stateManager";
import { getCreateTree, getInitialOntologyTree } from "../../../../utils";
import { getMapStateToProps } from "../../logic";

export const setup = () => {
  const initialState: TAppState = {
    pageType: EPage.Ontology,
    pageState: {
      isLoading: true,
      tree: getInitialOntologyTree(),
    },
  };

  const stateManager = new StateManager<TAppState>(initialState);

  const mapStateToButtonProps = getMapStateToProps({
    createTree: getCreateTree({
      setState: stateManager.setState.bind(stateManager),
      MenuComponent: {} as React.FC<TMenuProps>,
    }),
  });

  return { stateManager, mapStateToButtonProps };
};

import {
  TAppState,
  TOntologiesPageState,
  TSetState,
} from "../../../../../types";
import { TItemProps } from "../../../../../components/Item/types";
import { getOntologies } from "../../../logic/useCases/getOntologies.case";
import { TOntologiesDependencies } from "../../../types";
import { mapItemToItemMenuProps } from "../Menu/logic";
import { openOntologyItemMenu } from "../Menu/logic/domain/menu.domain";
import { mapItemToItemPromptProps } from "../Prompt/logic";

export const mapStateToOntologiesProps = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies,
  state: TOntologiesPageState
) =>
  state.pageState.list.map(
    (item) =>
      ({
        ...item,
        menuProps: mapItemToItemMenuProps(setState, dependencies, item),
        onClick: () => getOntologies(item, setState, dependencies),
        onMenuClick: () => openOntologyItemMenu(setState, item.id),
        promptProps: mapItemToItemPromptProps(setState, item, dependencies),
      }) as TItemProps
  );

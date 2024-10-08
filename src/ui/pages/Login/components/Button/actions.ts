import { THierarchicalItem } from "../../../../components/Item/types";
import { EPage, TAppProps } from "../../../../types";
import { mapTreeToTreeProps } from "../../../Ontology/utils";

export const getDisabledButtonState =
  (isDisabled: boolean) => (_state: TAppProps) => {
    if (_state.pageType !== EPage.Login) return;

    _state.buttonProps.isDisabled = isDisabled;
  };

export const updateOntologyState =
  ({
    tree,
    errorText,
  }: {
    tree: Record<string, THierarchicalItem> | undefined;
    errorText: string;
  }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;

    _state.isLoading = false;

    if (!tree) {
      _state.error = errorText;
      return;
    }

    _state.tree = mapTreeToTreeProps(tree);
  };

export const updateLoginErrorState =
  ({ message }: { message: string | undefined }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Login) return;

    _state.message = message;
  };

import { TWordProps } from "../../../../components/Word/types";
import { FC } from "../../../../libs/react";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { viewModelSubject } from "../../../../view-model/ViewModelSubject/ViewModelSubject";
import { getDefaultMenuProps } from "../../../Ontology/components/Menu/utils";
import { findNotePropsById } from "../../utils/tree";

export const getConverter =
  ({
    getComponent,
    toggleCollapse,
  }: {
    getComponent?: () => FC<TWordProps>;
    toggleCollapse: (id: string) => void;
  }) =>
  (props: TWordProps) => {
    return {
      ...props,
      onClick: async () => {
        toggleCollapse(props.id);
      },
      onMenuClick: async () => {
        const state = viewModelSubject.getValue();

        viewModelSubject.next(
          getUpdateState(state)((_state) => {
            if (_state.pageType !== EPage.Note) return;

            const word = findNotePropsById(props.id, _state.wordTreeProps);

            if (!word) return;

            if (word.menuProps) return;

            word.menuProps = getDefaultMenuProps(props.id);

            word.menuProps.onBackgroundClick = () => {
              viewModelSubject.next(
                getUpdateState(viewModelSubject.getValue())((_state) => {
                  if (_state.pageType !== EPage.Note) return;

                  const word = findNotePropsById(
                    props.id,
                    _state.wordTreeProps
                  );

                  if (!word) return;

                  word.menuProps = undefined;
                })
              );
            };
          })
        );
      },
      Component: getComponent?.(),
    } as TWordProps;
  };

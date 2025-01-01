import { TWordProps } from "../../../../components/Word/types";
import { FC } from "../../../../libs/react";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { viewModelSubject } from "../../../../view-model/ViewModelSubject/ViewModelSubject";
import { TDeserializedWord, TSerializedWord } from "../../types";
import { generateTreePropsFromTree } from "../../utils";
import { deserializeNote, findNotePropsById } from "../../utils/tree";
import { EMenuConstant } from "./types";
import {
  getDefaultMenuProps,
  getDefaultPromptProps,
  getMenuItemById,
} from "./utils";

export const getConverter =
  ({
    getComponent,
    toggleCollapse,
    getSerializedWord,
    updateSerializedWord,
  }: {
    getComponent?: () => FC<TWordProps>;
    toggleCollapse: (id: string) => void;
    getSerializedWord: (id: string) => Promise<TSerializedWord | undefined>;
    updateSerializedWord: (word: TSerializedWord) => Promise<TDeserializedWord>;
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

            const editMenuItem = getMenuItemById(
              EMenuConstant.Edit,
              word.menuProps.itemsProps
            );

            if (editMenuItem) {
              editMenuItem.onClick = async () => {
                viewModelSubject.next(
                  getUpdateState(viewModelSubject.getValue())((_state) => {
                    if (_state.pageType !== EPage.Note) return;

                    const word = findNotePropsById(
                      props.id,
                      _state.wordTreeProps
                    );

                    if (!word) return;

                    if (word.promptProps) return;

                    word.promptProps = getDefaultPromptProps({});
                  })
                );

                const _word = await getSerializedWord(props.id);

                viewModelSubject.next(
                  getUpdateState(viewModelSubject.getValue())((_state) => {
                    if (_state.pageType !== EPage.Note) return;

                    const word = findNotePropsById(
                      props.id,
                      _state.wordTreeProps
                    );

                    if (!word) return;

                    if (!word.promptProps) return;

                    word.promptProps.textProps.isDisabled = false;
                    word.promptProps.textProps.value = _word?.open ?? "";
                    word.promptProps.textProps.onChange = (input) => {
                      viewModelSubject.next(
                        getUpdateState(viewModelSubject.getValue())(
                          (_state) => {
                            if (_state.pageType !== EPage.Note) return;

                            const word = findNotePropsById(
                              props.id,
                              _state.wordTreeProps
                            );

                            if (!word) return;

                            if (!word.promptProps) return;

                            word.promptProps.textProps.value = input;
                          }
                        )
                      );
                    };

                    word.promptProps.buttonProps.onClick = async () => {
                      viewModelSubject.next(
                        getUpdateState(viewModelSubject.getValue())(
                          (_state) => {
                            if (_state.pageType !== EPage.Note) return;

                            const word = findNotePropsById(
                              props.id,
                              _state.wordTreeProps
                            );

                            if (!word) return;

                            if (!word.promptProps) return;

                            word.promptProps.buttonProps.isDisabled = true;
                            word.promptProps.textProps.isDisabled = true;
                          }
                        )
                      );

                      const _state = viewModelSubject.getValue();

                      if (_state.pageType !== EPage.Note) return;

                      const word = findNotePropsById(
                        props.id,
                        _state.wordTreeProps
                      );

                      if (!word) return;

                      if (!word.promptProps) return;

                      const nextWord = {
                        id: word.id,
                        open: word.promptProps?.textProps.value ?? "",
                        closed: word.text,
                      } as TSerializedWord;

                      const deserializedNote =
                        await updateSerializedWord(nextWord);

                      const _word = generateTreePropsFromTree(deserializedNote);

                      viewModelSubject.next(
                        getUpdateState(viewModelSubject.getValue())(
                          (_state) => {
                            if (_state.pageType !== EPage.Note) return;

                            const word = findNotePropsById(
                              props.id,
                              _state.wordTreeProps
                            );

                            console.warn({ word, _word });

                            if (!word) return;

                            word.promptProps = undefined;

                            word.childrenProps = _word.childrenProps;
                          }
                        )
                      );
                    };
                  })
                );
              };
            }

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

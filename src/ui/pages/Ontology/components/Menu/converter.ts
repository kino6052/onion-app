import { TMenuProps } from "../../../../components/Menu/types";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { TViewModelSubject } from "../../../../view-model/ViewModelSubject/types";
import { TDeserializedWord } from "../../../Note/types";
import {
  generateTreePropsFromTree,
  getInitialNoteState,
} from "../../../Note/utils";
import { addNewItem, closeMenu, removeItem, renameItem } from "./actions";
import { EMenuConstant } from "./constants";
import { getMenuItemById } from "./utils";

type TOntologyConverter = {
  viewModelSubject: TViewModelSubject;
  getUniqueId: () => string;
  getParentId: (id: string) => Promise<string | undefined>;
  getNoteById: (id: string) => Promise<TDeserializedWord>;
};

export const getConverter =
  ({
    viewModelSubject,
    getUniqueId,
    getParentId,
    getNoteById,
  }: TOntologyConverter) =>
  (props: TMenuProps) => {
    const { id } = props;
    return getUpdateState(props)((_props) => {
      _props.onBackgroundClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(closeMenu(id))
        );
      };

      const menuItem01 = getMenuItemById(
        EMenuConstant.Remove,
        _props.itemsProps
      );

      menuItem01 &&
        (menuItem01.onClick = async () => {
          const parentId = await getParentId(id);
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(
              removeItem({ id, parentId })
            )
          );
        });

      const menuItem02 = getMenuItemById(EMenuConstant.Add, _props.itemsProps);

      menuItem02 &&
        (menuItem02.onClick = async () => {
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(
              addNewItem({ getUniqueId, id })
            )
          );
        });

      const menuItem03 = getMenuItemById(
        EMenuConstant.Rename,
        _props.itemsProps
      );

      menuItem03 &&
        (menuItem03.onClick = async () => {
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(renameItem({ id }))
          );
        });

      const menuItem04 = getMenuItemById(
        EMenuConstant.Examine,
        _props.itemsProps
      );

      menuItem04 &&
        (menuItem04.onClick = async () => {
          const state = getInitialNoteState();
          state.isLoading = true;
          viewModelSubject.next(state);

          const note = await getNoteById(id);
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())((state) => {
              if (state.pageType !== EPage.Note) return;
              state.wordTreeProps = generateTreePropsFromTree(note);
              state.isLoading = false;
            })
          );
        });
    });
  };

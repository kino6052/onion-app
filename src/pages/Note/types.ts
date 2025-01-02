import {
  TItem,
  TItemProps,
  TWithIsMenuOpenState,
} from "../../components/Item/types";
import { TMenuProps } from "../../components/Menu/types";
import { TPromptProps } from "../../components/Prompt/types";
import { TWordProps } from "../../components/Word/types";
import { TGetOntology } from "../../dependencies/getOntology/types";
import { TSaveNote } from "../../dependencies/saveNote/types";
import { FC } from "../../libs/react";
import {
  TIsLoadingState,
  TPromptState,
  TWithComponent,
  TWithId,
  TWithNotificationProps,
} from "../../types";

export type TPureNoteProps = {
  itemProps: TItemProps;
  wordTreeProps: TWordProps;
} & TIsLoadingState;

export type TNoteProps = Partial<{ editTextPrompt: TPromptProps }> &
  Partial<TWithNotificationProps> &
  TWithComponent<TNoteState> &
  TPureNoteProps;

export type TSerializedWord = {
  id: string;
  open: string;
  closed: string;
} & Partial<TIsCollapsed> &
  Partial<TWithIsMenuOpenState> &
  Partial<TWithSelectedRange> &
  Partial<{ isEditing: boolean; editedName: string }>;

export type TIsCollapsed = {
  isCollapsed: boolean;
};

export type TWithSelectedRange = {
  range: [number | null | undefined, number | null | undefined];
};

export type TDeserializedWord = {
  id: string;
  open: (string | TDeserializedWord)[];
  closed: string;
} & TIsCollapsed &
  Partial<TPromptState> &
  Partial<TWithIsMenuOpenState> &
  Partial<TWithSelectedRange> &
  Partial<{ isEditing: boolean; editedName: string }>;

export type TNoteState = TWithId & {
  wordTree: Record<string, TSerializedWord>;
} & { ontologyId: string } & Partial<{
    textEditPrompt: {
      text: string;
    };
  }>;

export type TNoteDependencies = {
  saveNote: TSaveNote;
  getOntology: TGetOntology;
  MenuComponent: FC<TMenuProps>;
};

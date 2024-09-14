import { Item } from "../../components/Item";
import { Word } from "../../components/Word";
import "./styles.scss";
import { TNoteProps } from "./types";

export const NotePage: React.FC<TNoteProps> = ({
  itemProps,
  wordTreeProps,
}) => {
  return (
    <div className="note-page">
      <div className="note-page__navigation">
        <Item {...itemProps} text="Note" />
      </div>
      <div className="note-page__content">
        <Word {...wordTreeProps} />
      </div>
    </div>
  );
};

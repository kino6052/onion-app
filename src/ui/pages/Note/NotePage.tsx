import { Item } from "../../components/Item";
import { Loader } from "../../components/Loader";
import { Prompt } from "../../components/Prompt";
import { Word } from "../../components/Word";
import "./styles.scss";
import { TNoteProps } from "./types";

export const NotePage: React.FC<TNoteProps> = ({
  itemProps,
  isLoading,
  wordTreeProps: { Component = Word, ...wordTreeProps },
  notificationProps,
}) => {
  return (
    <div className="note-page">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="note-page__navigation">
            <Item {...itemProps} text="Note" />
          </div>
          <div className="note-page__content">
            <Component {...wordTreeProps} />
          </div>
        </>
      )}
      {notificationProps && (
        <Prompt {...notificationProps} isNotificationOnly />
      )}
    </div>
  );
};

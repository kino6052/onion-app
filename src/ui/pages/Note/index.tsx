import { Word } from "./components/Word";
import { NotePage as _NotePage } from "./NotePage";
import "./styles.scss";
import { TNoteProps } from "./types";

export const NotePage: React.FC<TNoteProps> = (props) => (
  <_NotePage
    {...props}
    wordTreeProps={{
      ...props.wordTreeProps,
      Component: Word,
    }}
  />
);

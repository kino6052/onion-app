import { Button } from "../../components/Button";
import { Item } from "../../components/Item";
import { Typography } from "../../components/Typography";
import { ETypographyType } from "../../components/Typography/constants";
import { Word } from "../../components/Word";
import { EConstant } from "../../constants";
import { composeTree } from "../../utils";
import "./styles.scss";

export const NotePage: React.FC<{}> = ({ props }) => {
  return (
    <div className="note-page">
      <div className="note-page__navigation">
        <Item id="" text="Note" />
      </div>
      <div className="note-page__content">
        <Word>One</Word>
        <Word isCollapsible>
          <Word>Test</Word>
          <Word>Test</Word>
          <Word isCollapsible>
            <Word>Test</Word>
            <Word>Test</Word>
            <Word>Test</Word>
          </Word>
          <Word>Test</Word>
        </Word>
        <Word>Two</Word>
        <Word>Two</Word>
        <Word>Two</Word>
        <Word>Two</Word>
        <Word>Two</Word>
        <Word>Two</Word>
      </div>
    </div>
  );
};

import { Word as _Word } from "../../../../components/Word";
import { TWordProps } from "../../../../components/Word/types";
import { getWithRange } from "../../withRange";
import { TextComponent } from "../TextComponent";

export const Word = (props: TWordProps) => {
  const getTextComponent = () => {
    const withRange = getWithRange();
    return withRange(TextComponent);
  };

  return <_Word {...props} getTextComponent={getTextComponent} />;
};

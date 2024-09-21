import { Word as _Word } from "../../../../components/Word";
import { TWordProps } from "../../../../components/Word/types";
import { compose } from "../../../../libs/compose";
import { FC } from "../../../../libs/react";
import { withDataConverter } from "../../../../utils/withConverter";
import { getConverter } from "./converter";

const converter = getConverter({ getComponent: () => Word });

export const Word = compose(
  withDataConverter<TWordProps, TWordProps>(converter)(_Word)
) as FC<TWordProps>;

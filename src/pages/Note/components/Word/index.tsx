import { Word as _Word } from "../../../../components/Word";
import { TWordProps } from "../../../../components/Word/types";
import { compose } from "../../../../libs/compose";
import { FC } from "../../../../libs/react";
import { withDataConverter } from "../../../../utils/withConverter";
import { composeTest } from "./root";

const { converter } = composeTest();

export const Word = compose(
  withDataConverter<TWordProps, TWordProps>(converter)(_Word)
) as FC<TWordProps>;

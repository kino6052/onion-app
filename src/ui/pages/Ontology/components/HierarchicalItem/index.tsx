import compose from "compose-function";
import { HierarchicalItem as _Item } from "../../../../components/Item";
import { withDataConverter } from "../../../../utils/withConverter";
import { getConverter } from "./converter";
import { getStateSubject } from "../../../../view-model/StateSubject";
import { uniqueId } from "lodash";

const converter = getConverter({
  stateSubject: getStateSubject(),
  getUniqueId: uniqueId,
});

export const HierarchicalItem = compose(withDataConverter(converter))(_Item);

import compose from "compose-function";
import { Menu as _Menu } from "../../../../components/Menu";
import { withDataConverter } from "../../../../utils/withConverter";
import { getStateSubject } from "../../../../view-model/StateSubject";
import { getConverter } from "./converter";
import { uniqueId } from "lodash";

const converter = getConverter({
  stateSubject: getStateSubject(),
  getUniqueId: uniqueId,
});

export const Menu = compose(withDataConverter(converter))(_Menu);

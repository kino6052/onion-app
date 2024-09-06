import compose from "compose-function";
import { uniqueId } from "lodash";
import { HierarchicalItem as _Item } from "../../../../components/Item";
import { withDataConverter } from "../../../../utils/withConverter";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { Menu } from "../Menu";
import { getConverter } from "./converter";

const converter = getConverter({
  viewModelSubject: getViewModelSubject(),
  getUniqueId: uniqueId,
  MenuComponent: Menu,
});

export const HierarchicalItem = compose(withDataConverter(converter))(_Item);

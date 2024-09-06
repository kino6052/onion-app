import compose from "compose-function";
import { Menu as _Menu } from "../../../../components/Menu";
import { withDataConverter } from "../../../../utils/withConverter";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getConverter } from "./converter";
import { uniqueId } from "lodash";

const converter = getConverter({
  viewModelSubject: getViewModelSubject(),
  getUniqueId: uniqueId,
});

export const Menu = compose(withDataConverter(converter))(_Menu);

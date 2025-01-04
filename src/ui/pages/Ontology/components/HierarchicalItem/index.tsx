import { uniqueId } from "lodash";
import { Menu } from "../../../../components/Menu";
import { getMapStateToProps } from "./logic";
import { getNote } from "../../../../dependencies/getNote/dev";

export const mapStateToHierarchicalItemProps = getMapStateToProps({
  MenuComponent: Menu,
  getUniqueId: uniqueId,
  getNote: getNote,
});

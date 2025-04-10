import { uniqueId } from "../../../../libs/lodash";
import { Menu } from "../../../../components/Menu";
import { getMapStateToProps } from "./logic";
import { getNote } from "../../../../dependencies/hierarchy/note/getNote/dev";

export const mapStateToHierarchicalItemProps = getMapStateToProps({
  MenuComponent: Menu,
  getUniqueId: uniqueId,
  getNote: getNote,
});

import { Menu } from "../../../../components/Menu";
import { getMapStateToProps } from "./logic";
import { uniqueId } from "lodash";

export const mapStateToHierarchicalItemProps = getMapStateToProps({
  MenuComponent: Menu,
  getUniqueId: uniqueId,
});

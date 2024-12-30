import { EConstant } from "../../../../../constants";
import { Menu } from "../../../../components/Menu";
import { getMapStateToProps } from "./logic";
import { uniqueId } from "lodash";

export const mapStateToHierarchicalItemProps = getMapStateToProps({
  MenuComponent: Menu,
  getUniqueId: uniqueId,
  getNote: () =>
    Promise.resolve({
      [EConstant.Root]: {
        id: EConstant.Root,
        open: "This is text.",
        closed: "Root",
        isCollapsed: false,
      },
    }),
});

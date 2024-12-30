import { mapStateToHierarchicalItemProps } from "./components/HierarchicalItem";
import { getMapStateToProps } from "./logic";

export const mapStateToOntologyProps = getMapStateToProps({
  mapStateToHierarchicalItemProps,
});

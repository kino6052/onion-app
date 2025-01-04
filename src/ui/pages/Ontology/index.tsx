import { saveOntology } from "../../dependencies/saveOntology/dev";
import { mapStateToHierarchicalItemProps } from "./components/HierarchicalItem";
import { getMapStateToProps } from "./logic";

export const mapStateToOntologyProps = getMapStateToProps({
  mapStateToHierarchicalItemProps,
  saveOntology,
});

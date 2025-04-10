import { Menu } from "../../components/Menu/Menu";
import { getOntology } from "../../dependencies/hierarchy/ontology/getOntology/dev";
import { logout } from "../../dependencies/logout/dev";
import { getMapStateToOntologiesProps } from "./logic";
import { saveOntology } from "../../dependencies/hierarchy/ontology/saveOntology/dev";
import { removeOntology } from "../../dependencies/hierarchy/ontology/removeOntology/dev";
import { uniqueId } from "../../libs/lodash";

export const mapStateToOntologiesProps = getMapStateToOntologiesProps({
  Menu,
  logout,
  getOntology,
  getUniqueId: uniqueId,
  saveOntology,
  removeOntology,
});

import { uniqueId } from "lodash";
import { Menu } from "../../components/Menu/Menu";
import { getOntology } from "../../dependencies/getOntology/dev";
import { logout } from "../../dependencies/logout/dev";
import { getMapStateToOntologiesProps } from "./logic";
import { saveOntology } from "../../dependencies/saveOntology/dev";

export const mapStateToOntologiesProps = getMapStateToOntologiesProps({
  Menu,
  logout,
  getOntology,
  getUniqueId: uniqueId,
  saveOntology,
});

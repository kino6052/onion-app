import { uniqueId } from "lodash";
import { getMapStateToProps } from "./logic";
import "./styles.scss";
import { getMapStateToItemProps } from "./logic/menu";
import { getOntology } from "../../dependencies/getOntology/dev";
import { Menu } from "../../components/Menu";

export const mapStateToNoteProps = getMapStateToProps({
  getUniqueId: uniqueId,
  mapStateToItemProps: getMapStateToItemProps({
    getOntology,
    MenuComponent: Menu,
  }),
});

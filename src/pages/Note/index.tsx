import { getMapStateToProps } from "./logic";
import "./styles.scss";
import { getMapStateToItemProps } from "./logic/menu";
import { getOntology } from "../../dependencies/hierarchy/ontology/getOntology/dev";
import { Menu } from "../../components/Menu";
import { saveNote } from "../../dependencies/hierarchy/note/saveNote/dev";
import { uniqueId } from "../../libs/lodash";

export const mapStateToNoteProps = getMapStateToProps({
  getUniqueId: uniqueId,
  mapStateToItemProps: getMapStateToItemProps({
    getOntology,
    MenuComponent: Menu,
    saveNote,
  }),
});

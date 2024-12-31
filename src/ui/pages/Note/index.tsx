import { uniqueId } from "lodash";
import { getMapStateToProps } from "./logic";
import "./styles.scss";
import { getMapStateToItemProps } from "./logic/menu";
import { getOntology } from "../../dependencies/getOntology/dev";

export const mapStateToNoteProps = getMapStateToProps({
  getUniqueId: uniqueId,
  mapStateToItemProps: getMapStateToItemProps({ getOntology }),
});

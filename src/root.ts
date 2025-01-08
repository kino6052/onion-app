import { getMapStateToProps } from "./logic";
import { mapStateToLoginPageProps } from "./pages/Login";
import { mapStateToNoteProps } from "./pages/Note";
import { mapStateToOntologyProps } from "./pages/Ontology";

export const mapStateToAppProps = getMapStateToProps({
  mapStateToLoginPageProps,
  mapStateToOntologyProps,
  mapStateToNoteProps,
});

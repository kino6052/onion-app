import { getMapStateToProps } from "./logic";
import { mapStateToLoginPageProps } from "./pages/Login";
import { mapStateToOntologyProps } from "./pages/Ontology";

export const mapStateToAppProps = getMapStateToProps({
  mapStateToLoginPageProps,
  mapStateToOntologyProps,
});

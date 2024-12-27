import { withDataConverter } from "../../utils/withConverter";
import { converter } from "./logic";
import { OntologyPage as _OntologyPage } from "./OntologyPage";
import compose from "compose-function";

export const OntologyPage = compose(withDataConverter(converter))(
  _OntologyPage
);

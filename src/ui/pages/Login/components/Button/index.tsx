import { Button as _Button } from "../../../../components/Button";
import { TButtonProps } from "../../../../components/Button/types";
import { withDataConverter } from "../../../../utils/withConverter";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getInitialOntologyTree } from "../../../Ontology/utils";
import { getConverter } from "./converter";
import compose from "compose-function";

// TODO: Compose function
const converter = getConverter({
  viewModelSubject: getViewModelSubject(),
  getErrorText: () => Promise.resolve("Error"),
  getTree: () => Promise.resolve(getInitialOntologyTree()),
  login: () =>
    Promise.resolve({
      isSuccessful: true,
    }),
});

export const Button = compose<React.FC<TButtonProps>>(
  withDataConverter(converter)
)(_Button);

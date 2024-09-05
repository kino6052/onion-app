import { Item } from "../../components/Item";
import { composeTree } from "./utils/tree";
import "./styles.scss";
import { TOntologyProps } from "./types";

export const OntologyPage: React.FC<TOntologyProps> = ({ tree, menuProps }) => {
  return (
    <div className="ontology-page">
      <div className="ontology-page__navigation">
        <Item {...menuProps} text="Ontology" />
      </div>
      <div className="ontology-page__content">{composeTree(tree)}</div>
    </div>
  );
};

import { HierarchicalItem, Item } from "../../components/Item";
import { Loader } from "../../components/Loader";
import "./styles.scss";
import { TOntologyProps } from "./types";

export const OntologyPage: React.FC<TOntologyProps> = ({
  hierarchicalItemProps,
  menuProps,
  ItemComponent = HierarchicalItem,
  isLoading,
}) => {
  return (
    <div className="ontology-page">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="ontology-page__navigation">
            <Item {...menuProps} text="Ontology" />
          </div>
          <div className="ontology-page__content">
            <ItemComponent {...hierarchicalItemProps} />
          </div>
        </>
      )}
    </div>
  );
};

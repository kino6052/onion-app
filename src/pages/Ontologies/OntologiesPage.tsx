import { Item } from "../../components/Item/Item";
import { Loader } from "../../components/Loader";
import { Prompt } from "../../components/Prompt/Prompt";
import { FC } from "../../libs/react";
import { TOntologiesProps } from "./types";
import "./styles.scss";

export const OntologiesPage: FC<TOntologiesProps> = ({
  isLoading,
  menuProps,
  notificationProps,
  ontologiesProps,
  promptProps,
}) => {
  return (
    <div className="ontologies-page">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="ontologies-page__navigation">
            <Item {...menuProps} text="Ontology" />
          </div>
          <div className="ontologies-page__content">
            {ontologiesProps.map((props) => (
              <Item {...props} />
            ))}
          </div>
        </>
      )}
      {notificationProps && (
        <Prompt {...notificationProps} isNotificationOnly />
      )}
      {promptProps && <Prompt {...promptProps} />}
    </div>
  );
};

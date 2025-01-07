import { Item } from "../../components/Item/Item";
import { Loader } from "../../components/Loader";
import { Prompt } from "../../components/Prompt/Prompt";
import { FC } from "../../../libs/react";
import "./styles.scss";
import { TOntologiesProps } from "./types";

export const OntologiesPage: FC<TOntologiesProps> = ({
  isLoading,
  menuProps,
  notificationProps,
  ontologiesProps,
}) => {
  return (
    <div className="ontologies-page">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="ontologies-page__navigation">
            <Item {...menuProps} text="List of Ontologies" />
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
    </div>
  );
};

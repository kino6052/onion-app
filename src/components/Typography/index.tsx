import { PropsWithChildren } from "react";
import { ETypographyType } from "./constants";
import { findFirst } from "../../utils";
import "./styles.scss";

export const Typography: React.FC<
  PropsWithChildren<{ type: ETypographyType }>
> = ({ type, children }) => {
  const Component = findFirst([type === ETypographyType.Heading && "h2", "p"]);

  return (
    <Component
      className={[
        "typography",
        type === ETypographyType.Label && "typography__label",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
};

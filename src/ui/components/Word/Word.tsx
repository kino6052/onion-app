import "./styles.scss";
import { TWordProps } from "./types";

export const Word: React.FC<React.PropsWithChildren<TWordProps>> = ({
  onClick,
  onMenuClick,
  childrenProps,
  isCollapsible,
  id,
}) => {
  return (
    <div
      className={["word-component", isCollapsible && "collapsible"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      <span className="word-component__text">
        {childrenProps.map((props) => {
          if (typeof props === "string") return <span>{`${props} `}</span>;

          return <Word {...props} />;
        })}
      </span>
      {isCollapsible && (
        <button className="word-component__menu" onClick={onMenuClick}></button>
      )}
    </div>
  );
};

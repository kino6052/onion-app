import "./styles.scss";
import { TWordProps } from "./types";

export const Word: React.FC<React.PropsWithChildren<TWordProps>> = ({
  onClick,
  onMenuClick,
  children,
  isCollapsible,
}) => {
  return (
    <div
      className={["word-component", isCollapsible && "collapsible"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      <span className="word-component__text">{children}</span>
      {isCollapsible && (
        <button className="word-component__menu" onClick={onMenuClick}></button>
      )}
    </div>
  );
};

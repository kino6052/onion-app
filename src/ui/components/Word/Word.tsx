import "./styles.scss";
import { TWordProps } from "./types";

export const Word: React.FC<React.PropsWithChildren<TWordProps>> = ({
  onClick,
  onMenuClick,
  childrenProps,
  isCollapsible,
  getTextComponent = ({ index }: { index: number }) =>
    ({ children }) => <span>{children}</span>,
  id,
}) => {
  const TextComponent = getTextComponent();

  return (
    <div
      className={["word-component", isCollapsible && "collapsible"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      <span className="word-component__text">
        {childrenProps.map((props, i) => {
          if (typeof props === "string")
            return <TextComponent index={i}>{`${props} `}</TextComponent>;

          return <Word {...props} getTextComponent={getTextComponent} />;
        })}
      </span>
      {isCollapsible && (
        <button className="word-component__menu" onClick={onMenuClick}></button>
      )}
    </div>
  );
};

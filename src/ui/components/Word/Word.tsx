import { TextComponent } from "../Text";
import "./styles.scss";
import { TWordProps } from "./types";
import { isTextComponent } from "./utils";

export const Word: React.FC<React.PropsWithChildren<TWordProps>> = ({
  onClick,
  onMenuClick,
  childrenProps,
  isCollapsible,
  Component = Word,
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
        {childrenProps.map((props, i) => {
          if (isTextComponent(props)) {
            return <TextComponent index={i}>{props.children}</TextComponent>;
          }

          return <Component {...props} />;
        })}
      </span>
      {isCollapsible && (
        <button className="word-component__menu" onClick={onMenuClick}></button>
      )}
    </div>
  );
};

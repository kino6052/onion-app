import { Menu } from "../Menu";
import { Prompt } from "../Prompt";
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
  isOpen,
  text,
  promptProps,
  menuProps,
  id,
}) => {
  console.warn({ isOpen, text, childrenProps });
  return (
    <div
      className={["word-component", isCollapsible && "collapsible"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      <span className="word-component__text">
        {!isOpen && text}
        {!!isOpen &&
          childrenProps.map((props, i) => {
            if (isTextComponent(props)) {
              return <TextComponent index={i}>{props.children}</TextComponent>;
            }

            return <Component {...props} />;
          })}
      </span>
      {menuProps && <Menu {...menuProps} />}
      {promptProps && <Prompt {...promptProps} />}
      {isCollapsible && (
        <button className="word-component__menu" onClick={onMenuClick}></button>
      )}
    </div>
  );
};

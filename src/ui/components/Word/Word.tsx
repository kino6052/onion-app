import { useEffect, useState } from "react";
import { Menu } from "../Menu";
import { useMenuRefs } from "../Menu/utils/useMenuRefs";
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
  const [[x, y], setCoordinates] = useState([100, 100]);
  const { menuRef } = useMenuRefs();

  useEffect(() => {
    if (menuRef.current !== null) {
      const menuPosition = menuRef.current.getBoundingClientRect();
      const style = menuRef.current.style;
      style.left = `${x - menuPosition.width}px`;
      style.top = `${y}px`;
    }
  }, [x, y]);

  return (
    <div
      className={["word-component", isCollapsible && "collapsible"]
        .filter(Boolean)
        .join(" ")}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        setCoordinates([e.clientX, e.clientY]);
        onClick();
      }}
    >
      <span className="word-component__text">
        {!isOpen && text}
        {!!isOpen &&
          childrenProps.map((props, i) => {
            if (isTextComponent(props)) {
              return (
                <TextComponent key={i} isSelected={props.isSelected}>
                  {props.children}{" "}
                </TextComponent>
              );
            }

            return <Component {...props} />;
          })}
      </span>
      {menuProps && <Menu {...menuProps} ref={menuRef} />}
      {promptProps && <Prompt {...promptProps} />}
      {isCollapsible && (
        <button className="word-component__menu" onClick={onMenuClick}></button>
      )}
    </div>
  );
};

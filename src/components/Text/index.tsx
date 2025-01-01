import { TTextProps } from "./types";
import "./styles.scss";

export const TextComponent: React.FC<TTextProps> = ({
  children,
  isSelected,
  onClick,
  onMouseOver,
}) => (
  <span
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    onMouseOver={(e) => {
      e.stopPropagation();
      onMouseOver?.();
    }}
    className="text-component__item"
    style={{
      backgroundColor: isSelected ? "rgba(255, 255, 0, 0.5)" : "transparent",
    }}
  >
    {children}
  </span>
);

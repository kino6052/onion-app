import { TTextProps } from "./types";
import "./styles.scss";

export const TextComponent: React.FC<TTextProps> = ({
  children,
  isSelected,
  onClick,
}) => (
  <span
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className="text-component__item"
    style={{
      backgroundColor: isSelected ? "rgba(255, 255, 0, 0.5)" : "transparent",
    }}
  >
    {children}
  </span>
);

import { TTextProps } from "./types";

export const TextComponent: React.FC<TTextProps> = ({
  children,
  isSelected,
}) => (
  <span
    style={{
      backgroundColor: isSelected ? "rgba(255, 255, 0, 0.5)" : "transparent",
    }}
  >
    {children}
  </span>
);

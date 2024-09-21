import { TTextProps } from "./types";

export const TextComponent: React.FC<TTextProps> = ({ children }) => (
  <span>{children}</span>
);

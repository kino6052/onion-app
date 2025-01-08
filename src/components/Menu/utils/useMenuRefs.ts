import { useEffect, useRef } from "react";

export const useMenuRefs = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (menuRef.current && menuButtonRef.current) {
      const buttonPosition = menuButtonRef.current.getBoundingClientRect();
      const menuPosition = menuRef.current.getBoundingClientRect();
      const style = menuRef.current.style;
      style.position = "absolute";
      style.left = `${buttonPosition.x - menuPosition.width}px`;
      style.top = `${buttonPosition.y}px`;
    }
  }, [menuRef, menuButtonRef]);

  return { menuRef, menuButtonRef };
};

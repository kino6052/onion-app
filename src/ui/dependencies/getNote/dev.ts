import { EConstant } from "../../../constants";
import { TGetNote } from "./types";

export const getNote: TGetNote = () =>
  Promise.resolve({
    [EConstant.Root]: {
      id: EConstant.Root,
      open: "This is text.",
      closed: "Root",
      isCollapsed: false,
    },
  });

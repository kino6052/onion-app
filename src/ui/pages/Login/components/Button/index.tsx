import { EConstant } from "../../../../../constants";
import { Button } from "../../../../components/Button";
import { TLoginResponse } from "../../types";
import { getMapStateToProps } from "./logic";

export const mapStateToButtonProps = getMapStateToProps({
  login: () =>
    Promise.resolve({
      ontology: {
        [EConstant.Root]: {
          id: EConstant.Root,
          isCollapsed: false,
          isMenuOpen: false,
          successors: [],
          text: EConstant.Root,
        },
      },
    } satisfies TLoginResponse),
  ButtonComponent: Button,
});

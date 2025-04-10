import { Button } from "../../../../components/Button";
import { onClick } from "./dependencies/onClick/dev";
import { getMapStateToProps } from "./logic";

export const mapStateToButtonProps = getMapStateToProps({
  onClick,
  ButtonComponent: Button,
});

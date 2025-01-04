import { Button } from "../../../../components/Button";
import { login } from "../../../../dependencies/login/dev";
import { getMapStateToProps } from "./logic";

export const mapStateToButtonProps = getMapStateToProps({
  login: login,
  ButtonComponent: Button,
});

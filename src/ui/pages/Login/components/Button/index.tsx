import { Button } from "../../../../components/Button";
import { getMapStateToProps } from "./logic";

export const mapStateToButtonProps = getMapStateToProps({
  login: () => Promise.resolve({}),
  ButtonComponent: Button,
});

import { withDataConverter } from "../../utils/withConverter";
import { LoginPage as _LoginPage } from "./LoginPage";
import compose from "compose-function";
import { TLoginProps } from "./types";
import { getUpdateState } from "../../utils";
import { Button } from "./components/Button";

export const LoginPage = compose(
  withDataConverter((props: TLoginProps) => {
    return getUpdateState(props)((_props) => {
      _props.buttonProps.ButtonComponent = Button;
    });
  })
)(_LoginPage);

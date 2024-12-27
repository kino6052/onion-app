import compose from "compose-function";
import { withDataConverter } from "../../utils/withConverter";
import { LoginPage as _LoginPage } from "./LoginPage";
import { TLoginProps } from "./types";

export const LoginPage = compose(withDataConverter((props: TLoginProps) => {}))(
  _LoginPage
);

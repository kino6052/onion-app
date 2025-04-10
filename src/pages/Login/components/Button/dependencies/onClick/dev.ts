import { login } from "../../../../../../dependencies/login/dev";
import { getStateManager } from "../../../../../../dependencies/state/dev";
import { getOnClick } from "./logic";

export const onClick = getOnClick({
  login,
  setState: getStateManager().setState,
});

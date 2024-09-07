import compose from "compose-function";
import { Menu as _Menu } from "../../../../components/Menu";
import { withDataConverter } from "../../../../utils/withConverter";
import { composeTest } from "./root";

const { converter } = composeTest();

export const Menu = compose(withDataConverter(converter))(_Menu);

import { getMapStateToProps } from "./logic";
import { mapStateToLoginPageProps } from "./pages/Login";
import { TAppState, TSetState } from "./types";

export const mapStateToAppProps = getMapStateToProps({
  mapStateToLoginPageProps,
});

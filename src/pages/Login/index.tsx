import { mapStateToButtonProps } from "./components/Button";
import { getMapStateToProps } from "./logic";

export const mapStateToLoginPageProps = getMapStateToProps({
  mapStateToButtonProps,
});

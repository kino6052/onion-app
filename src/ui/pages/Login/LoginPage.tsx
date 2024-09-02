import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { ETypographyType } from "../../components/Typography/constants";
import "./styles.scss";
import { TLoginProps } from "./types";
import { withDataConverter } from "../../utils/withConverter";
import compose from "compose-function";
import { getConverter } from "./converter";
import { getStateSubject } from "../../../services/StateSubject";
import { TButtonProps } from "../../components/Button/types";

const converter = getConverter({
  stateSubject: getStateSubject(),
});

const EnhancedButton = compose<React.FC<TButtonProps>>(
  withDataConverter(converter)
)(Button);

export const LoginPage: React.FC<TLoginProps> = ({ buttonProps }) => {
  return (
    <div className="login-page">
      <div className="login-page__text">
        <Typography type={ETypographyType.Heading}>Onion Notes</Typography>
        <Typography type={ETypographyType.Regular}>
          App for making ontologies and summaries
        </Typography>
      </div>
      <div className="login-page__buttons">
        <Typography type={ETypographyType.Label}>Login options</Typography>
        <EnhancedButton {...buttonProps} hasIcon>
          {buttonProps?.children ?? "Login with Github"}
        </EnhancedButton>
      </div>
    </div>
  );
};

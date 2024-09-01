import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { ETypographyType } from "../../components/Typography/constants";
import "./styles.scss";
import { TLoginProps } from "./types";

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
        <Button {...buttonProps} hasIcon>
          Login with Github
        </Button>
      </div>
    </div>
  );
};

import { BehaviorSubject } from "rxjs";
import { EPage, TAppProps, TWithoutBehavior } from "../../ui/types";
import { TStateSubject } from "./types";
import { TLoginProps } from "../../ui/pages/Login/types";

const initialProps = {
  page: EPage.Login,
  pageProps: {
    buttonProps: {
      hasIcon: true,
      onClick: () => {
        throw Error("Not implemented");
      },
    },
  } as TLoginProps,
};

export const stateSubject: TStateSubject = new BehaviorSubject<
  TWithoutBehavior<TAppProps>
>(initialProps);

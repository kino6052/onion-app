import { TItemProps } from "../../../components/Item/types";
import { TGetUniqueId } from "../../../dependencies/getUniqueId/types";
import {
  EPage,
  TAppState,
  TMapStateToProps,
  TNotePageProps,
  TNotePageState,
  TSetState,
} from "../../../types";
import { noop } from "../../../utils";
import { TNoteProps } from "../types";
import { getMapStateToItemProps } from "./menu";
import { getMapStateToWordTreeProps } from "./word";

const mapStateToNotificationProps = (state: TNotePageState) =>
  state.pageState.hasError
    ? {
        buttonProps: {
          onClick: noop,
          children: "OK",
        },
        description: state.pageState.message ?? "An error occurred",
        onBackgrounClick: noop,
        title: "Error",
        isNotificationOnly: true,
      }
    : undefined;

export const getMapStateToProps =
  ({
    getUniqueId,
    mapStateToItemProps,
  }: {
    getUniqueId: TGetUniqueId;
    mapStateToItemProps: TMapStateToProps<TAppState<EPage.Note>, TItemProps>;
  }): TMapStateToProps<TAppState<EPage.Note>, TNotePageProps> =>
  (state: TNotePageState, setState: TSetState<TAppState>) => {
    return {
      pageProps: {
        isLoading: state.pageState.isLoading,
        itemProps: mapStateToItemProps(state, setState),
        wordTreeProps: getMapStateToWordTreeProps({ getUniqueId })(
          state,
          setState
        ),
        notificationProps: mapStateToNotificationProps(state),
      } satisfies TNoteProps,
      pageType: EPage.Note,
    };
  };

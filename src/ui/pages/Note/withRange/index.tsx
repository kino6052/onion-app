import { BehaviorSubject } from "rxjs";
import { PropsWithChildren, useEffect } from "react";
import { TRangeComponentProps, TWithIndex, TWithText } from "./types";
import { isInRange, useSharedState } from "./utils";
import { findFirst } from "../../../utils";

export function getWithRange() {
  const RangeSubject = new BehaviorSubject<[number, number]>([-1, -1]);

  return function (
    WrappedComponent: React.FC<PropsWithChildren<TRangeComponentProps>>
  ) {
    const Component: React.FC<PropsWithChildren<TWithIndex>> = ({
      children,
      index,
    }) => {
      const [range, setRange] = useSharedState(RangeSubject);

      useEffect(() => {
        const listener = (e: KeyboardEvent) => {
          if (e.key !== "Escape") return;

          RangeSubject.next([-1, -1]);
        };

        document.addEventListener("keyup", listener);

        return () => document.removeEventListener("keyup", listener);
      }, []);

      const isHighlighted = isInRange(index, RangeSubject.getValue());

      const onClick = () => {
        if (range[0] < 0) {
          setRange([index, range[1]]);
          return;
        }

        setRange([-1, -1]);
      };

      const onMouseOver = () => {
        if (range[0] >= 0) {
          setRange([range[0], index]);
          return;
        }
      };

      return (
        <span
          style={{ background: findFirst([isHighlighted && "green"]) }}
          onClick={onClick}
          onMouseOver={onMouseOver}
        >
          <WrappedComponent children={children} />
        </span>
      );
    };

    return Component;
  };
}

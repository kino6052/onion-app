import { FC, useEffect, useState } from "../libs/react";
import { BehaviorSubject, tap } from "../libs/rxjs";

export function withState<TProps extends Record<string, unknown>>(
  subject: BehaviorSubject<TProps>
) {
  return function (WrappedComponent: FC<TProps>) {
    return () => {
      const [props, setProps] = useState<TProps>(subject.getValue());

      useEffect(() => {
        const subscription = subject
          .pipe(
            tap((state) => {
              setProps(subject.getValue());
            })
          )
          .subscribe();

        return () => subscription.unsubscribe();
      }, []);

      return <WrappedComponent {...props} />;
    };
  };
}

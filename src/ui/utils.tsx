import { produce } from "immer";
import { Observable, filter, lastValueFrom, take } from "rxjs";

export function findFirst<T extends unknown>(arr: T[], fallback?: T) {
  return (arr.find(Boolean) || fallback) as Exclude<T, false>;
}

export function getUpdateState<T extends Record<string, unknown>>(state: T) {
  return (converter: (state: T) => void) => produce(state, converter);
}

export const noop = () => {
  throw Error("Not implemented");
};

export function checkEventual<T extends Record<string, unknown>>(
  predicate: (result: T | undefined) => boolean,
  observable: Observable<T | undefined>
) {
  return lastValueFrom(observable.pipe(filter(predicate), take(1)));
}

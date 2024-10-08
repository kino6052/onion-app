import { produce } from "immer";
import { Subject, filter, lastValueFrom, take } from "rxjs";

export function findFirst<T extends unknown>(arr: T[], fallback?: T) {
  return (arr.find(Boolean) || fallback) as Exclude<T, boolean>;
}

export function templateParser<T extends Record<string, unknown>>(
  value: string,
  vars: T
) {
  if (!value) return [""];
  if (!vars) return [value];

  return value
    .split(" ")
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/{{(\w+)}}/i);
      if (!match) return entry;

      const [, captureMatch] = match;

      return vars[captureMatch];
    });
}

export function getUpdateState<T extends Record<string, unknown>>(state: T) {
  return (converter: (state: T) => void) => produce(state, converter);
}

export const noop = () => {
  throw Error("Not implemented");
};

export const throwError =
  (message: string = "Oops") =>
  () => {
    throw Error(message);
  };

export function checkEventual(
  predicate: () => boolean,
  onChange: (cb: () => void) => void
) {
  const subject = new Subject<boolean>();

  onChange(() => {
    subject.next(predicate());
  });

  return lastValueFrom(subject.pipe(filter(Boolean), take(1)));
}

import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

export const useSharedState = <T>(
  subject: BehaviorSubject<T>
): [T, (state: T) => void] => {
  const [value, setState] = useState<T>(subject.getValue());
  useEffect(() => {
    const sub = subject.subscribe((s) => setState(s));
    return () => sub.unsubscribe();
  }, [subject]);
  const newSetState = (state: T) => subject.next(state);
  return [value, newSetState];
};

export const setPartial = <T>(
  subject: BehaviorSubject<T>,
  partial: Partial<T>
) => {
  const prev = subject.getValue();
  subject.next({ ...prev, ...partial });
};

export const isInRange = (index: number, range: [number, number]) => {
  if (range[1] === -1 && index !== range[0]) return false;
  const _range = [...range].sort();
  return index >= _range[0] && index <= _range[1];
};

export const stringToTextNodes = (input: string) =>
  input.split(" ").map((text) => ({ text }));

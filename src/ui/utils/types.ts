export type TWithRecursiveFallback<T, TFallback = null> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? TFallback | TWithRecursiveFallback<U, TFallback>[] // NOTE: when value is array
    : T[P] extends object
      ? T[P] extends (...args: any[]) => any
        ? T[P] | TFallback
        : TFallback | TWithRecursiveFallback<T[P], TFallback>
      : T[P] | TFallback; // NOTE: otherwise
};

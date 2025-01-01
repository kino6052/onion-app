import { FC } from "../libs/react";

/**
 * HOC for converting incoming data to new format
 * */
export function withDataConverter<
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown>,
>(dataConverter: (input: TInput) => TOutput) {
  return (WrappedComponent: FC<TOutput>) => {
    return (props: TInput) => (
      <WrappedComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...dataConverter(props)}
      />
    );
  };
}

import { ExtractAtomArgs, WritableAtom, useSetAtom } from 'jotai';

type WithInitialValue<Value> = {
  init: Value;
};

type actionsType<T> = {
  [k in keyof T]: WritableAtom<null, ExtractAtomArgs<T>, void> & WithInitialValue<null>;
};

export type WrappedActions<T> = {
  [K in keyof T]: ReturnType<typeof useSetAtom<null, ExtractAtomArgs<T[K]>, void>>;
};

export const jotaiCreateActions = <T>(actions: actionsType<T>) => {
  return {
    ...(Object.fromEntries(
      Object.entries(actions).map(([key, action]) => {
        return [
          key,
          useSetAtom(
            action as WritableAtom<null, ExtractAtomArgs<T>, void> & WithInitialValue<null>,
          ),
        ];
      }),
    ) as WrappedActions<T>),
  };
};
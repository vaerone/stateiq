import { useState, useCallback } from 'react';

function isUpdater<T>(value: unknown): value is (prev: T) => T {
  return typeof value === 'function';
}

export function useEqualityState<T>(
  initialValue: T,
  isEqual: (a: T, b: T) => boolean
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setCustomState = useCallback(
    (nextState: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value = isUpdater<T>(nextState) ? nextState(prev) : nextState;
        return isEqual(prev, value) ? prev : value;
      });
    },
    [isEqual]
  );

  return [state, setCustomState];
}

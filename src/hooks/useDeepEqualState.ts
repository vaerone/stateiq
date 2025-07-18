import { useState, useCallback } from 'react';
import { deepEqual } from '../utils/__internal__/deepEqual';

function isUpdater<T>(value: unknown): value is (prev: T) => T {
  return typeof value === 'function';
}

export function useDeepEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setDeepState = useCallback((nextState: T | ((prev: T) => T)) => {
    setState((prev) => {
      const value = isUpdater<T>(nextState) ? nextState(prev) : nextState;
      return deepEqual(prev, value) ? prev : value;
    });
  }, []);

  return [state, setDeepState];
}

import { useState, useCallback } from 'react';
import { shallowEqualSafe } from '@internal/shallowEqual';

function isUpdater<T>(value: unknown): value is (prev: T) => T {
  return typeof value === 'function';
}

export function useShallowEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((nextState: T | ((prev: T) => T)) => {
    setState((prev) => {
      const value = isUpdater<T>(nextState) ? nextState(prev) : nextState;
      return shallowEqualSafe(prev, value) ? prev : value;
    });
  }, []);

  return [state, setShallowState];
}

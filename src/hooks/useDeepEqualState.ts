import { useState, useCallback } from 'react';
import { deepEqual } from '@internal/deepEqual';
import { structuralShare } from '@internal/structuralShare';
import { StructuralSharingOptions } from '@internal/types';

function isUpdater<T>(value: unknown): value is (prev: T) => T {
  return typeof value === 'function';
}

export function useDeepEqualState<T>(
  initialValue: T,
  options?: StructuralSharingOptions
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setDeepState = useCallback(
    (nextState: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value = isUpdater<T>(nextState) ? nextState(prev) : nextState;
        if (deepEqual(prev, value)) return prev;
        return options?.structuralSharing ? structuralShare(prev, value) : value;
      });
    },
    [options?.structuralSharing]
  );

  return [state, setDeepState];
}

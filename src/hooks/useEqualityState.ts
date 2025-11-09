import { useState, useCallback } from 'react';
import { structuralShare } from '@internal/structuralShare';
import { StructuralSharingOptions } from '@internal/types';

function isUpdater<T>(value: unknown): value is (prev: T) => T {
  return typeof value === 'function';
}

interface EqualityStateOptions<T> extends StructuralSharingOptions {
  isEqual?: (a: T, b: T) => boolean;
}

export function useEqualityState<T>(
  initialValue: T,
  isEqualOrOptions?: ((a: T, b: T) => boolean) | EqualityStateOptions<T>
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const isEqual = typeof isEqualOrOptions === 'function' ? isEqualOrOptions : (isEqualOrOptions?.isEqual ?? Object.is);

  const structuralSharing = typeof isEqualOrOptions === 'object' && isEqualOrOptions.structuralSharing;

  const setEqualityState = useCallback(
    (nextState: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value = isUpdater<T>(nextState) ? nextState(prev) : nextState;
        if (isEqual(prev, value)) return prev;
        return structuralSharing ? structuralShare(prev, value) : value;
      });
    },
    [isEqual, structuralSharing]
  );

  return [state, setEqualityState];
}

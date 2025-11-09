import { useRef, useEffect } from 'react';
import { deepEqual } from '@internal/deepEqual';
import { structuralShare } from '@internal/structuralShare';
import { StructuralSharingOptions } from '@internal/types';

export function usePreviousDeepEqual<T>(value: T, options?: StructuralSharingOptions): T | undefined {
  const ref = useRef<T>();
  const prev = ref.current;

  useEffect(() => {
    if (!deepEqual(prev, value)) {
      ref.current = options?.structuralSharing ? structuralShare(prev as T, value) : value;
    }
  }, [value, options?.structuralSharing]);

  return prev;
}

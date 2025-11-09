import { useRef, useMemo } from 'react';
import { deepEqual } from '@internal/deepEqual';
import { structuralShare } from '@internal/structuralShare';
import { StructuralSharingOptions } from '@internal/types';

export function useMemoDeepEqual<T>(value: T, options?: StructuralSharingOptions): T {
  const ref = useRef<T>(value);

  if (!deepEqual(ref.current, value)) {
    ref.current = options?.structuralSharing ? structuralShare(ref.current, value) : value;
  }

  return useMemo(() => ref.current, [ref.current]);
}

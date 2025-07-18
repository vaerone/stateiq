import { useMemo, useRef } from 'react';
import { deepEqual } from '../utils/__internal__/deepEqual';

export function useMemoDeepEqual<T>(value: T): T {
  const ref = useRef<T>(value);

  if (!deepEqual(ref.current, value)) {
    ref.current = value;
  }

  return useMemo(() => ref.current, [ref.current]);
}

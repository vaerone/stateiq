import { useMemo, useRef } from 'react';
import { shallowEqualSafe } from '@/utils/__internal__/shallowEqual';

export function useMemoShallowEqual<T>(value: T): T {
  const ref = useRef<T>(value);

  if (!shallowEqualSafe(ref.current, value)) {
    ref.current = value;
  }

  return useMemo(() => ref.current, [ref.current]);
}

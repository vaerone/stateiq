import { useRef, useEffect } from 'react';
import { deepEqual } from '@internal/deepEqual';

export function usePreviousDeepEqual<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    if (!deepEqual(ref.current, value)) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
}

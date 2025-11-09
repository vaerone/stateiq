import { renderHook } from '@testing-library/react';
import { useMemoDeepEqual } from '@stateiq/hooks/useMemoDeepEqual';

describe('useMemoDeepEqual', () => {
  it('returns memoized value when deeply equal', () => {
    const value = { a: 1 };
    const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val), {
      initialProps: { val: value },
    });

    const first = result.current;
    rerender({ val: { a: 1 } });
    expect(result.current).toBe(first);
  });

  it('returns new reference when deeply different', () => {
    const value = { a: 1 };
    const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val), {
      initialProps: { val: value },
    });

    const first = result.current;
    rerender({ val: { a: 2 } });
    expect(result.current).not.toBe(first);
  });
});

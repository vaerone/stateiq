import { renderHook } from '@testing-library/react';
import { usePreviousDeepEqual } from '@stateiq/hooks/usePreviousDeepEqual';

describe('usePreviousDeepEqual', () => {
  it('returns undefined initially', () => {
    const { result } = renderHook(() => usePreviousDeepEqual(1));
    expect(result.current).toBeUndefined();
  });

  it('returns previous value when deeply different', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousDeepEqual(value), {
      initialProps: { value: { a: 1 } },
    });

    rerender({ value: { a: 2 } });
    expect(result.current).toEqual({ a: 1 });
  });

  it('retains previous value if deeply equal', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousDeepEqual(value), {
      initialProps: { value: { a: 1 } },
    });

    rerender({ value: { a: 1 } });
    expect(result.current).toEqual({ a: 1 });
  });
});

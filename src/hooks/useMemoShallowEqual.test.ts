import { renderHook } from '@testing-library/react';
import { useMemoShallowEqual } from './useMemoShallowEqual';

describe('useMemoShallowEqual', () => {
  it('returns memoized value when shallowly equal', () => {
    const value = { a: 1 };
    const { result, rerender } = renderHook(({ val }) => useMemoShallowEqual(val), {
      initialProps: { val: value },
    });

    const first = result.current;
    rerender({ val: { a: 1 } });
    expect(result.current).toBe(first);
  });

  it('returns new reference when shallowly different', () => {
    const value = { a: 1 };
    const { result, rerender } = renderHook(({ val }) => useMemoShallowEqual(val), {
      initialProps: { val: value },
    });

    const first = result.current;
    rerender({ val: { a: 2 } });
    expect(result.current).not.toBe(first);
  });
});

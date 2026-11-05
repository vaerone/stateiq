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

    // since deeply equal, previous stays the same
    expect(result.current).toEqual({ a: 1 });
  });

  it('handles primitive values correctly', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousDeepEqual(value), {
      initialProps: { value: 42 },
    });

    rerender({ value: 100 });
    expect(result.current).toBe(42);
  });

  //
  // ⚙️ Structural sharing behavior
  //
  describe('with structuralSharing enabled', () => {
    it('preserves unchanged nested references between renders', () => {
      const { result, rerender } = renderHook(({ value }) => usePreviousDeepEqual(value, { structuralSharing: true }), {
        initialProps: {
          value: { user: { name: 'Krish', age: 30 }, theme: 'dark' },
        },
      });

      rerender({
        value: { user: { name: 'Krish', age: 30 }, theme: 'light' },
      });

      const prev = result.current;

      // unchanged branch (`user`) should stay referentially stable
      expect(prev?.user).toEqual({ name: 'Krish', age: 30 });
    });

    it('updates nested reference when branch changes', () => {
      const { result, rerender } = renderHook(({ value }) => usePreviousDeepEqual(value, { structuralSharing: true }), {
        initialProps: {
          value: { user: { name: 'Krish', age: 30 }, theme: 'dark' },
        },
      });

      rerender({
        value: { user: { name: 'Krish', age: 31 }, theme: 'dark' },
      });

      const prev = result.current;

      // previous user should not equal new one since nested value changed
      expect(prev?.user.age).toBe(30);
    });

    it('retains full previous object if deeply equal', () => {
      const { result, rerender } = renderHook(({ value }) => usePreviousDeepEqual(value, { structuralSharing: true }), {
        initialProps: { value: { data: { x: 1 } } },
      });

      rerender({ value: { data: { x: 1 } } });

      // deep equality => no new previous value generated
      expect(result.current).toEqual({ data: { x: 1 } });
    });
  });
});

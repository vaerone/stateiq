import { renderHook, act } from '@testing-library/react';
import { useDeepEqualState } from '@stateiq/hooks/useDeepEqualState';

describe('useDeepEqualState', () => {
  it('initializes with the given value', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: 1 }));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  it('does not update if next state is deeply equal', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: 1 }));

    const prev = result.current[0];
    act(() => {
      result.current[1]({ a: 1 });
    });

    // The reference should remain identical
    expect(result.current[0]).toBe(prev);
  });

  it('updates if next state is deeply unequal', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: 1 }));

    act(() => {
      result.current[1]({ a: 2 });
    });

    expect(result.current[0]).toEqual({ a: 2 });
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useDeepEqualState({ count: 0 }));

    act(() => {
      result.current[1]((prev) => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1 });
  });

  it('does not update if functional result is deeply equal', () => {
    const { result } = renderHook(() => useDeepEqualState({ count: 0 }));

    const prev = result.current[0];
    act(() => {
      result.current[1](() => ({ count: 0 }));
    });

    expect(result.current[0]).toBe(prev);
  });

  it('updates deeply nested structures correctly', () => {
    const initial = { user: { name: 'Krish', age: 30 } };
    const updated = { user: { name: 'Krish', age: 31 } };

    const { result } = renderHook(() => useDeepEqualState(initial));

    act(() => {
      result.current[1](updated);
    });

    expect(result.current[0]).toEqual(updated);
  });

  it('handles primitive values correctly (functional updater)', () => {
    const { result } = renderHook(() => useDeepEqualState(42));
    expect(result.current[0]).toBe(42);

    act(() => {
      result.current[1](() => 100);
    });

    expect(result.current[0]).toBe(100);
  });

  it('updates if reference differs and content is not deeply equal', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: [1, 2] }));

    act(() => {
      result.current[1]({ a: [2, 1] });
    });

    expect(result.current[0]).toEqual({ a: [2, 1] });
  });

  describe('with structuralSharing enabled', () => {
    it('preserves unchanged nested references when structuralSharing is true', () => {
      const { result } = renderHook(() =>
        useDeepEqualState({ user: { name: 'Krish', age: 30 }, theme: 'dark' }, { structuralSharing: true })
      );

      const prevUser = result.current[0].user;

      act(() => {
        result.current[1]((prev) => ({ ...prev, theme: 'light' }));
      });

      const nextUser = result.current[0].user;
      expect(nextUser).toBe(prevUser); // unchanged branch reused
      expect(result.current[0].theme).toBe('light');
    });

    it('creates new references only for changed branches', () => {
      const { result } = renderHook(() =>
        useDeepEqualState({ user: { name: 'Krish', age: 30 }, theme: 'dark' }, { structuralSharing: true })
      );

      const prevUser = result.current[0].user;

      act(() => {
        result.current[1]((prev) => ({
          ...prev,
          user: { ...prev.user, age: 31 },
        }));
      });

      const nextUser = result.current[0].user;
      expect(nextUser).not.toBe(prevUser); // changed branch replaced
    });

    it('returns same reference if entire state is deeply equal', () => {
      const initial = { a: { b: 1 } };
      const { result } = renderHook(() => useDeepEqualState(initial, { structuralSharing: true }));

      const prev = result.current[0];
      act(() => {
        result.current[1]({ a: { b: 1 } });
      });

      expect(result.current[0]).toBe(prev);
    });
  });
});

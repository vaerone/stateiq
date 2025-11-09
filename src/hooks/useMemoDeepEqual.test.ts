import { renderHook } from '@testing-library/react';
import { useMemoDeepEqual } from '@stateiq/hooks/useMemoDeepEqual';

describe('useMemoDeepEqual', () => {
  //
  // 🧩 Basic deep equality behavior
  //
  it('returns memoized value when deeply equal', () => {
    const value = { a: 1 };
    const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val), {
      initialProps: { val: value },
    });

    const first = result.current;
    rerender({ val: { a: 1 } });

    // Deep equality detected, so reference should remain same
    expect(result.current).toBe(first);
  });

  it('returns new reference when deeply different', () => {
    const value = { a: 1 };
    const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val), {
      initialProps: { val: value },
    });

    const first = result.current;
    rerender({ val: { a: 2 } });

    // Deep difference detected, so reference should change
    expect(result.current).not.toBe(first);
  });

  it('handles primitive values correctly', () => {
    const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val), {
      initialProps: { val: 42 },
    });

    const first = result.current;
    rerender({ val: 42 });
    expect(result.current).toBe(first);

    rerender({ val: 100 });
    expect(result.current).not.toBe(first);
  });

  //
  // ⚙️ Structural sharing behavior
  //
  describe('with structuralSharing enabled', () => {
    it('reuses unchanged nested references when structure is partially updated', () => {
      const initial = { user: { name: 'Krish', age: 30 }, theme: 'dark' };

      const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val, { structuralSharing: true }), {
        initialProps: { val: initial },
      });

      const prevUser = result.current.user;

      // Update only top-level key
      rerender({ val: { user: { name: 'Krish', age: 30 }, theme: 'light' } });

      const nextUser = result.current.user;

      // Deep equality keeps user reference the same
      expect(nextUser).toBe(prevUser);
      expect(result.current.theme).toBe('light');
    });

    it('creates new references when nested branch changes', () => {
      const initial = { user: { name: 'Krish', age: 30 }, theme: 'dark' };

      const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val, { structuralSharing: true }), {
        initialProps: { val: initial },
      });

      const prevUser = result.current.user;

      // Change inside user branch
      rerender({ val: { user: { name: 'Krish', age: 31 }, theme: 'dark' } });

      const nextUser = result.current.user;

      // user branch updated -> new reference
      expect(nextUser).not.toBe(prevUser);
    });

    it('preserves full reference when value is deeply equal', () => {
      const initial = { data: { x: 1 } };

      const { result, rerender } = renderHook(({ val }) => useMemoDeepEqual(val, { structuralSharing: true }), {
        initialProps: { val: initial },
      });

      const first = result.current;
      rerender({ val: { data: { x: 1 } } });

      // Deeply equal → no changes → same reference
      expect(result.current).toBe(first);
    });
  });
});

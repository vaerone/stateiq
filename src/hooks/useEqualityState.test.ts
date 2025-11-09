import { renderHook, act } from '@testing-library/react';
import { useEqualityState } from '@stateiq/hooks/useEqualityState';

describe('useEqualityState', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useEqualityState(1, (a, b) => a === b));
    expect(result.current[0]).toBe(1);
  });

  it('does not update state if new value is equal', () => {
    const { result } = renderHook(() => useEqualityState(1, (a, b) => a === b));

    act(() => {
      const [, setState] = result.current;
      setState(1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('updates state if new value is not equal', () => {
    const { result } = renderHook(() => useEqualityState(1, (a, b) => a === b));

    act(() => {
      const [, setState] = result.current;
      setState(2);
    });

    expect(result.current[0]).toBe(2);
  });

  it('supports updater function', () => {
    const { result } = renderHook(() => useEqualityState(1, (a, b) => a === b));

    act(() => {
      const [, setState] = result.current;
      setState((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it('does not update if updater result is equal', () => {
    const { result } = renderHook(() => useEqualityState(1, (a, b) => a === b));

    act(() => {
      const [, setState] = result.current;
      setState((prev) => prev);
    });

    expect(result.current[0]).toBe(1);
  });

  //
  // ⚙️ Structural sharing behavior
  //
  describe('with structuralSharing enabled', () => {
    it('reuses unchanged branches when equality condition holds', () => {
      const { result } = renderHook(() =>
        useEqualityState(
          { user: { name: 'Krish', age: 30 }, theme: 'dark' },
          {
            isEqual: (a, b) => a.theme === b.theme,
            structuralSharing: true,
          }
        )
      );

      const prevUser = result.current[0].user;

      act(() => {
        const [, setState] = result.current;
        setState((prev) => ({ ...prev, theme: 'light' }));
      });

      const nextUser = result.current[0].user;

      expect(nextUser).toBe(prevUser);
      expect(result.current[0].theme).toBe('light');
    });

    it('creates new nested references when changed branch updates', () => {
      const { result } = renderHook(() =>
        useEqualityState(
          { user: { name: 'Krish', age: 30 }, theme: 'dark' },
          {
            isEqual: () => false,
            structuralSharing: true,
          }
        )
      );

      const prevUser = result.current[0].user;

      act(() => {
        const [, setState] = result.current;
        setState((prev) => ({
          ...prev,
          user: { ...prev.user, age: 31 },
        }));
      });

      const nextUser = result.current[0].user;
      expect(nextUser).not.toBe(prevUser);
    });

    it('preserves state reference when values are deeply equal', () => {
      const { result } = renderHook(() =>
        useEqualityState(
          { user: { name: 'Krish' } },
          { isEqual: (a, b) => a.user.name === b.user.name, structuralSharing: true }
        )
      );

      const prev = result.current[0];
      act(() => {
        const [, setState] = result.current;
        setState({ user: { name: 'Krish' } });
      });

      const next = result.current[0];
      expect(next).toBe(prev);
    });

    it('uses Object.is as default equality when no isEqual provided', () => {
      const { result } = renderHook(() => useEqualityState({ a: 1 }, { structuralSharing: true }));

      const prev = result.current[0];

      act(() => {
        const [, setState] = result.current;
        setState({ a: 1 });
      });

      expect(result.current[0]).toBe(prev);
    });

    it('updates when Object.is detects inequality for primitives', () => {
      const { result } = renderHook(() => useEqualityState(1, { structuralSharing: true }));

      expect(result.current[0]).toBe(1);

      act(() => {
        const [, setState] = result.current;
        setState(2);
      });

      expect(result.current[0]).toBe(2);
    });

    it('applies structural sharing automatically with default equality', () => {
      const { result } = renderHook(() =>
        useEqualityState({ user: { name: 'Krish', age: 30 }, theme: 'dark' }, { structuralSharing: true })
      );

      const prevUser = result.current[0].user;

      act(() => {
        const [, setState] = result.current;
        setState((prev) => ({ ...prev, theme: 'light' }));
      });

      const nextUser = result.current[0].user;
      expect(nextUser).toBe(prevUser);
    });
  });
});

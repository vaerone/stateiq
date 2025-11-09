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
});

import { renderHook, act } from '@testing-library/react';
import { useShallowEqualState } from '@stateiq/hooks/useShallowEqualState';

describe('useShallowEqualState', () => {
  it('initializes with the given value', () => {
    const { result } = renderHook(() => useShallowEqualState({ name: 'Ram', age: 30 }));
    expect(result.current[0]).toEqual({ name: 'Ram', age: 30 });
  });

  it('updates state if not shallow equal', () => {
    const { result } = renderHook(() => useShallowEqualState({ name: 'Ram', age: 30 }));

    act(() => {
      result.current[1]({ name: 'Ram', age: 31 });
    });

    expect(result.current[0]).toEqual({ name: 'Ram', age: 31 });
  });

  it('does not update state if shallow equal', () => {
    const initial = { name: 'Ram', age: 30 };
    const { result } = renderHook(() => useShallowEqualState(initial));

    const prev = result.current[0];

    act(() => {
      result.current[1]({ name: 'Ram', age: 30 });
    });

    const next = result.current[0];

    expect(next).toBe(prev);
  });

  it('accepts a function to update state', () => {
    const { result } = renderHook(() => useShallowEqualState({ count: 0, label: 'counter' }));

    act(() => {
      result.current[1]((prev) => ({ ...prev, count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1, label: 'counter' });
  });

  it('skips update if updater function returns shallow equal value', () => {
    const initial = { count: 0, label: 'counter' };
    const { result } = renderHook(() => useShallowEqualState(initial));

    const prev = result.current[0];

    act(() => {
      result.current[1]((prev) => ({ ...prev }));
    });

    const next = result.current[0];

    expect(next).toBe(prev);
  });
});

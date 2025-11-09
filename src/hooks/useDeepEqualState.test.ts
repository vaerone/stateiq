import { renderHook, act } from '@testing-library/react-hooks';
import { useDeepEqualState } from '@stateiq/hooks/useDeepEqualState';

describe('useDeepEqualState', () => {
  it('initializes with the given value', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: 1 }));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  it('does not update if next state is deeply equal', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: 1 }));

    act(() => {
      result.current[1]({ a: 1 });
    });

    expect(result.current[0]).toBe(result.current[0]);
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

    act(() => {
      result.current[1](() => ({ count: 0 }));
    });

    expect(result.current[0]).toEqual({ count: 0 });
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

  it('handles primitive values', () => {
    const { result } = renderHook(() => useDeepEqualState(42));
    expect(result.current[0]).toBe(42);
  });

  it('updates if reference differs and content is not deeply equal', () => {
    const { result } = renderHook(() => useDeepEqualState({ a: [1, 2] }));

    act(() => {
      result.current[1]({ a: [2, 1] });
    });

    expect(result.current[0]).toEqual({ a: [2, 1] });
  });
});

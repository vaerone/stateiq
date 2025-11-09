import { shallowEqualSafe } from '@internal/shallowEqual';

describe('shallowEqualSafe', () => {
  it('returns true for the same reference', () => {
    const obj = { a: 1 };
    expect(shallowEqualSafe(obj, obj)).toBe(true);
  });

  it('returns false if either input is not an object', () => {
    expect(shallowEqualSafe(null, {})).toBe(false);
    expect(shallowEqualSafe({}, null)).toBe(false);
    expect(shallowEqualSafe('hello', {})).toBe(false);
    expect(shallowEqualSafe({}, 42)).toBe(false);
    expect(shallowEqualSafe(true, {})).toBe(false);
    expect(shallowEqualSafe(undefined, {})).toBe(false);
    expect(shallowEqualSafe(Symbol('x'), {})).toBe(false);
  });

  it('returns true for shallowly equal objects', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 2 };
    expect(shallowEqualSafe(a, b)).toBe(true);
  });

  it('returns false for objects with different values', () => {
    const a = { x: 1 };
    const b = { x: 2 };
    expect(shallowEqualSafe(a, b)).toBe(false);
  });
});

import { shallowEqual } from '@internal/shallowEqual';

describe('shallowEqual', () => {
  it('returns true for the same reference', () => {
    const obj = { a: 1 };
    expect(shallowEqual(obj, obj)).toBe(true);
  });

  it('returns true for shallowly equal objects', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 2 };
    expect(shallowEqual(a, b)).toBe(true);
  });

  it('returns false if keys differ', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1 };
    expect(shallowEqual(a, b)).toBe(false);
  });

  it('returns false if values differ', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 3 };
    expect(shallowEqual(a, b)).toBe(false);
  });

  it('returns true if keys and values match, even with no prototype', () => {
    const a = { x: 1 };
    const b = Object.create(null);
    b.x = 1;
    expect(shallowEqual(a, b)).toBe(true);
  });

  it('returns false for same keys but different value types', () => {
    const a = { x: 1 };
    const b = { x: '1' };
    expect(shallowEqual(a, b)).toBe(false);
  });

  it('returns false for symbol keys mismatch', () => {
    const sym = Symbol('key');
    const a = { [sym]: 1 };
    const b = { [Symbol('key')]: 1 };
    expect(shallowEqual(a, b)).toBe(false);
  });

  it('returns true for same symbol key/value', () => {
    const sym = Symbol('x');
    const a = { [sym]: 1 };
    const b = { [sym]: 1 };
    expect(shallowEqual(a, b)).toBe(true);
  });
});

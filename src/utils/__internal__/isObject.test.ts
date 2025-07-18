import { isObject } from './isObject';

describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'value' })).toBe(true);
  });

  it('returns true for arrays (typeof is object)', () => {
    expect(isObject([])).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
  });

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('returns false for primitives', () => {
    expect(isObject('string')).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(Symbol('sym'))).toBe(false);
  });

  it('returns true for functions (typeof is function, not object)', () => {
    expect(isObject(() => {})).toBe(false);
  });

  it('returns true for instances of classes', () => {
    class MyClass {}
    const instance = new MyClass();
    expect(isObject(instance)).toBe(true);
  });
});

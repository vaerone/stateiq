import { deepEqual } from '@/utils/__internal__/deepEqual';

describe('deepEqual', () => {
  describe('Primitive values', () => {
    it('returns true for equal numbers and strings', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual('abc', 'abc')).toBe(true);
    });

    it('returns false for unequal booleans or null vs undefined', () => {
      expect(deepEqual(true, false)).toBe(false);
      expect(deepEqual(null, undefined)).toBe(false);
    });

    it('treats NaN as equal to NaN', () => {
      expect(deepEqual(NaN, NaN)).toBe(true);
    });
  });

  describe('Date objects', () => {
    it('returns true for Date instances with equal timestamps', () => {
      expect(deepEqual(new Date('2020'), new Date('2020'))).toBe(true);
    });

    it('returns false for Date instances with different timestamps', () => {
      expect(deepEqual(new Date('2020'), new Date('2021'))).toBe(false);
    });

    it('returns false when comparing Date to non-Date object', () => {
      expect(deepEqual(new Date(), {})).toBe(false);
      expect(deepEqual({}, new Date())).toBe(false);
    });
  });

  describe('Regular expressions', () => {
    it('returns true for RegExp objects with same pattern and flags', () => {
      expect(deepEqual(/abc/i, /abc/i)).toBe(true);
    });

    it('returns false for RegExp objects with different flags', () => {
      expect(deepEqual(/abc/i, /abc/)).toBe(false);
    });
  });

  describe('Functions', () => {
    it('returns true for the same function reference', () => {
      const fn = () => {};
      expect(deepEqual(fn, fn)).toBe(true);
    });

    it('returns false for different function instances', () => {
      const fn1 = () => {};
      const fn2 = () => {};
      expect(deepEqual(fn1, fn2)).toBe(false);
    });

    it('returns false when comparing function to non-function', () => {
      expect(deepEqual(() => {}, 5)).toBe(false);
      expect(deepEqual(5, () => {})).toBe(false);
    });

    it('returns false when only one argument is a function', () => {
      expect(deepEqual(() => {}, {})).toBe(false);
      expect(deepEqual({}, () => {})).toBe(false);
    });
  });

  describe('Plain objects and arrays', () => {
    it('returns true for objects with equal key-value pairs', () => {
      expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    it('returns false for objects with differing values', () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('returns true for arrays with equal elements in same order', () => {
      expect(deepEqual([1, 2], [1, 2])).toBe(true);
    });

    it('returns false for arrays with same elements in different order', () => {
      expect(deepEqual([1, 2], [2, 1])).toBe(false);
    });

    it('returns false when number of keys differ', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('returns false when key is present in one object but missing in other', () => {
      expect(deepEqual({ a: 1 }, {})).toBe(false);
    });

    it('returns false when key is undefined in one object but missing in the other', () => {
      expect(deepEqual({ a: undefined }, {})).toBe(false);
    });

    it('returns false when one object has a key the other does not', () => {
      expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
      expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
  });

  describe('Symbol keys', () => {
    it('returns true for objects with equal symbol keys and values', () => {
      const sym = Symbol();
      expect(deepEqual({ [sym]: 1 }, { [sym]: 1 })).toBe(true);
    });

    it('returns false for objects with equal symbol keys but different values', () => {
      const sym = Symbol();
      expect(deepEqual({ [sym]: 1 }, { [sym]: 2 })).toBe(false);
    });

    it('returns false if one object is missing a symbol key', () => {
      const sym = Symbol('x');
      expect(deepEqual({ [sym]: 1 }, {})).toBe(false);
    });
  });

  describe('Prototype and inheritance', () => {
    it('returns false if a key exists in prototype chain but not as own property', () => {
      const proto = { a: 1 };
      const b = Object.create(proto);
      const a = { a: 1 };
      expect(deepEqual(a, b)).toBe(false);
    });
  });

  describe('Circular references', () => {
    it('returns true for structurally equal circular references', () => {
      type Circular = {
        foo: number;
        self: Circular;
      };

      const a: Partial<Circular> = { foo: 1 };
      a.self = a as Circular;

      const b: Partial<Circular> = { foo: 1 };
      b.self = b as Circular;

      expect(deepEqual(a, b)).toBe(true);
    });
  });

  describe('Mixed object and primitive comparisons', () => {
    it('returns false when comparing object to primitive', () => {
      expect(deepEqual({}, 1)).toBe(false);
      expect(deepEqual('hello', {})).toBe(false);
    });
  });
});

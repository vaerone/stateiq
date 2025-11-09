import { structuralShare } from '@internal/structuralShare';

describe('structuralShare', () => {
  it('returns previous reference if Object.is detects equality', () => {
    const obj = { a: 1 };
    const result = structuralShare(obj, obj);
    expect(result).toBe(obj);
  });

  it('returns next when one value is not an object', () => {
    const prev = 1;
    const next = 2;
    const mixedPrev = { a: 1 };
    const mixedNext = { a: 1 };

    expect(structuralShare(prev, next)).toBe(next);
    expect(structuralShare(mixedPrev as unknown as number, 2)).toBe(2);
    expect(structuralShare(1 as unknown as { a: number }, mixedNext)).toEqual({ a: 1 });
  });

  it('returns next when array and object types mismatch', () => {
    const prev = { a: 1 };
    const next = [1];
    expect(structuralShare(prev as unknown as number[], next)).toBe(next);
  });

  it('reuses unchanged object properties and replaces changed ones', () => {
    const prev = { a: 1, b: 2 };
    const next = { a: 1, b: 3 };
    const result = structuralShare(prev, next);

    expect(result.a).toBe(prev.a);
    expect(result.b).toBe(3);
    expect(result).not.toBe(prev);
  });

  it('returns previous object reference when all keys are unchanged', () => {
    const prev = { a: 1, b: { c: 2 } };
    const next = { a: 1, b: { c: 2 } };
    const result = structuralShare(prev, next);

    expect(result).toBe(prev);
    expect(result.b).toBe(prev.b);
  });

  it('handles nested object reuse recursively', () => {
    const prev = { a: { b: { c: 1 } }, d: 2 };
    const next = { a: { b: { c: 1 } }, d: 3 };
    const result = structuralShare(prev, next);

    expect(result.a).toBe(prev.a);
    expect(result.d).toBe(3);
  });

  it('returns previous array reference if elements are equal', () => {
    const prev = [1, 2, 3];
    const next = [1, 2, 3];
    const result = structuralShare(prev, next);
    expect(result).toBe(prev);
  });

  it('returns next array if lengths differ', () => {
    const prev = [1, 2, 3];
    const next = [1, 2, 3, 4];
    const result = structuralShare(prev, next);
    expect(result).toBe(next);
  });

  it('creates new array and reuses equal elements', () => {
    const prev = [1, 2, 3];
    const next = [1, 99, 3];
    const result = structuralShare(prev, next);

    expect(result[0]).toBe(prev[0]);
    expect(result[1]).toBe(99);
    expect(result[2]).toBe(prev[2]);
    expect(result).not.toBe(prev);
  });

  it('handles nested arrays with mixed reuse', () => {
    const prev = [[1], [2], [3]];
    const next = [[1], [9], [3]];
    const result = structuralShare(prev, next);

    expect(result[0]).toBe(prev[0]);
    expect(result[1]).not.toBe(prev[1]);
    expect(result[2]).toBe(prev[2]);
  });

  it('returns next when prev and next are of different structural types', () => {
    const prev: Record<string, number> | number[] = [1, 2, 3];
    const next: Record<string, number> | number[] = { a: 1 };
    const result = structuralShare(prev, next);
    expect(result).toBe(next);
  });
});

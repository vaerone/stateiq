import { isObject } from './isObject';

export function deepEqual(a: unknown, b: unknown, seen = new WeakMap<object, object>()): boolean {
  if (Object.is(a, b)) return true;

  if (typeof a === 'function' || typeof b === 'function') return Object.is(a, b);

  if (!isObject(a) || !isObject(b)) return false;

  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

  if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString();

  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;

  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    const valA = (a as Record<PropertyKey, unknown>)[key];
    const valB = (b as Record<PropertyKey, unknown>)[key];
    if (!deepEqual(valA, valB, seen)) return false;
  }

  return true;
}

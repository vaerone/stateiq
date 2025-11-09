import { isObject } from '@internal/isObject';

export function shallowEqual<T extends Record<PropertyKey, unknown>>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!Object.is(objA[key as keyof T], objB[key as keyof T])) return false;
  }

  return true;
}

export function shallowEqualSafe(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (!isObject(a) || !isObject(b)) return false;
  return shallowEqual(a, b);
}

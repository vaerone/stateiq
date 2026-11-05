import { isObject } from '@internal/isObject';

/**
 * Performs structural sharing between two values of the same type.
 * Avoids unnecessary cloning by reusing references for unchanged branches.
 */
export function structuralShare<T>(prev: T, next: T): T {
  if (Object.is(prev, next)) return prev;

  if (!isObject(prev) || !isObject(next)) return next;

  if (Array.isArray(prev) && Array.isArray(next)) {
    return structuralShareArray(prev, next) as unknown as T;
  }

  if (!Array.isArray(prev) && !Array.isArray(next)) {
    return structuralShareObject(prev, next);
  }

  return next;
}

function structuralShareObject<T extends object>(prev: T, next: T): T {
  let changed = false;
  const result = {} as { [K in keyof T]: T[K] };

  const nextKeys = Object.keys(next) as (keyof T)[];
  for (const key of nextKeys) {
    const prevValue = prev[key];
    const nextValue = next[key];
    const sharedValue = structuralShare(prevValue, nextValue);

    result[key] = sharedValue;
    if (!Object.is(sharedValue, prevValue)) changed = true;
  }

  return changed ? result : prev;
}

function structuralShareArray<T>(prev: readonly T[], next: readonly T[]): readonly T[] {
  if (prev.length !== next.length) return next;

  let changed = false;
  const result: T[] = [];

  for (let i = 0; i < next.length; i++) {
    const sharedValue = structuralShare(prev[i], next[i]);
    result.push(sharedValue);
    if (!Object.is(sharedValue, prev[i])) changed = true;
  }

  return changed ? result : prev;
}

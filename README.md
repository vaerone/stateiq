# stateiq

⚡ Lightweight React hooks for predictable and performant state updates powered by smart equality checks to minimize re-renders.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![size](https://img.shields.io/bundlephobia/minzip/@vaerone/stateiq)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=vaerone_stateiq&metric=bugs)](https://sonarcloud.io/summary/new_code?id=vaerone_stateiq)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=vaerone_stateiq&metric=coverage)](https://sonarcloud.io/summary/new_code?id=vaerone_stateiq)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=vaerone_stateiq&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=vaerone_stateiq)

---

## Features

- `useShallowEqualState` — prevents unnecessary re-renders by comparing state using shallow equality.
- `useDeepEqualState` — prevents unnecessary re-renders by comparing nested state using deep structural equality.
- `useEqualityState` — fully customizable state updater using your own equality logic.
- `useMemoDeepEqual`, `useMemoShallowEqual` — memoize values based on deep or shallow comparisons.
- `usePreviousDeepEqual` — track and compare previous state using deep equality.
- Internal utilities handle **circular references** gracefully.
- **Tree-shakable** — import only the hooks you use.
- **Minimal** and **dependency-free** — optimized for small bundle size.

---

## Installation

```bash
npm install @vaerone/stateiq
# or
yarn add @vaerone/stateiq
```

---

## Usage

### `useShallowEqualState`

```tsx
import { useShallowEqualState } from '@vaerone/stateiq';

type User = {
  name: string;
  role: string;
};

const Component = () => {
  const [user, setUser] = useShallowEqualState<User>({ name: 'Ram', role: 'Engineer' });

  return <div>{user.name}</div>;
};
```

### `useDeepEqualState`

```tsx
import { useDeepEqualState } from '@vaerone/stateiq';

type Config = {
  nested: {
    theme: string;
  };
};

const Component = () => {
  const [config, setConfig] = useDeepEqualState<Config>({ nested: { theme: 'dark' } });

  return <pre>{JSON.stringify(config)}</pre>;
};
```

### `useMemoDeepEqual` / `useMemoShallowEqual`

```tsx
import { useMemoDeepEqual, useMemoShallowEqual } from '@vaerone/stateiq';

type Settings = {
  options: string[];
};

const Component = ({ settings }: { settings: Settings }) => {
  const memoizedDeep = useMemoDeepEqual<Settings>(settings);
  const memoizedShallow = useMemoShallowEqual<Settings>(settings);

  return <div>{memoizedDeep.options.join(', ')}</div>;
};
```

### `usePreviousDeepEqual`

```tsx
import { usePreviousDeepEqual } from '@vaerone/stateiq';

type Value = {
  count: number;
};

const Component = ({ value }: { value: Value }) => {
  const previous = usePreviousDeepEqual<Value>(value);

  return (
    <div>
      Current: {value.count} | Previous: {previous?.count ?? 'N/A'}
    </div>
  );
};
```

### `useEqualityState`

```tsx
import { useEqualityState } from '@vaerone/stateiq';

type Profile = {
  name: string;
  age: number;
};

// Custom equality function that compares only the `age`
const isSameAge = (a: Profile, b: Profile) => a.age === b.age;

const Component = () => {
  const [profile, setProfile] = useEqualityState<Profile>({ name: 'Alice', age: 30 }, isSameAge);

  return (
    <div>
      {profile.name} - {profile.age}
    </div>
  );
};
```

Note: If you need deep comparison, use useDeepEqualState instead it internally handles nested object equality.

---

## API Reference

### `useShallowEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void]`

- **Returns**: A tuple `[state, setState]`
- **Behavior**: Updates state only if shallow comparison detects a change
- **Use Case**: For state objects with shallow structure (single-level keys)

---

### `useDeepEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void]`

- **Returns**: A tuple `[state, setState]`
- **Behavior**: Updates state only if a deep structural comparison detects a change
- **Use Case**: For nested objects or arrays that require structural equality checks

---

### `useEqualityState<T>(initialValue: T, isEqual: (a: T, b: T) => boolean): [T, (value: T | ((prev: T) => T)) => void]`

- **Returns**: A tuple `[state, setState]`
- **Behavior**: Uses a **custom equality function** to determine whether the state should update
- **Use Case**: Ideal when you want to control update logic based on your own comparison strategy

---

### `useMemoDeepEqual<T>(value: T): T`

- **Returns**: A **memoized** version of `value`
- **Behavior**: Returns the previous reference if the new value is deeply equal to it.
- **Use Case**: Helps prevent unnecessary re-renders or re-computations when passing deeply nested objects as dependencies or props.

---

### `useMemoShallowEqual<T>(value: T): T`

- **Returns**: A **memoized** version of `value`
- **Behavior**: Reuses the reference unless a shallow comparison detects a change
- **Use Case**: Useful when memoizing props or state objects with shallow shape (single-level keys)

---

### `usePreviousDeepEqual<T>(value: T): T | undefined`

- **Returns**: The **previous deeply equal** , retained only if it is deeply equal to the current one.
- **Behavior**: Stores and compares with the previous value using deep structural comparison.
- **Use Case**: For comparing past and current values without triggering updates due to reference changes alone.

---

## Development Setup

To enable Git hooks:

```bash
npm install
npx husky install
```

---

## Testing

All hooks and utilities have 100% test coverage.

```bash
npm run test
npm run coverage
```

---

## Code Style & Tooling

```bash
npm run lint
npm run format
```

Commit linting and formatting are automated via hooks

---

## Roadmap

We're actively working on improvements like structural sharing support and smarter comparison strategies.

See the full [ROADMAP.md](./ROADMAP.md) for upcoming features and milestones.

---

## License

MIT © Ram Krishnan

# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2025-07-18

### ⚠ Breaking Changes

- Consumers can **no longer import** `deepEqual`, `shallowEqual`, or `shallowEqualSafe` directly.
- These utilities are now considered internal and are **not part of the public API**.
- Use exported hooks like `useEqualityState`, `useDeepEqualState`, or `useMemoShallowEqual` instead.

### ✧ Features

- `useShallowEqualState` — prevents unnecessary re-renders by comparing state using shallow equality.
- `useDeepEqualState` — prevents unnecessary re-renders by comparing nested state using deep structural equality.
- `useEqualityState` — fully customizable state updater using your own equality logic.
- `useMemoDeepEqual`, `useMemoShallowEqual` — memoize values based on deep or shallow comparisons.
- `usePreviousDeepEqual` — track and compare previous state using deep equality.
- Internal utilities handle **circular references** gracefully.
- **Tree-shakable** — import only the hooks you use.
- **Minimal** and **dependency-free** — optimized for small bundle size.

### ▤ Internal

- Comparison utilities moved to `utils/__internal__` and no longer exported publicly.
- These are used internally by hooks and contribute minimally to the bundle.

---

This is the **initial release** of `stateiq`.
All core features are well-tested and documented. Feedback and contributions are welcome as we stabilize further.

# Roadmap

This document outlines planned features, enhancements, and ideas for future releases of `stateiq`. Contributions and feedback are welcome!

---

## ❖ Short-Term Goals (v0.x)

- [x] Publish initial stable release with core React hooks
- [x] Internalize deep and shallow equality utils
- [x] Add README, SonarCloud metrics, and badges
- [x] Add badges, SonarCloud metrics, and semantic versioning
- [x] Setup semantic release and versioning
- [x] Publish to GitHub and npm with the stateiq name

---

## ✦ Upcoming Features

Focused on enhancing usability, performance, and developer experience.

- [ ] **Structural Sharing Support**
  - Optimize referential equality by preserving unchanged object parts
  - Works great with libraries like React Query, Zustand, etc.

- [ ] **Selective Key Comparison**
  - Works great with libraries like React Query, Zustand, etc.
  - Ideal for form-heavy or config-driven UIs

- [ ] **React DevTools Enhancements**
  - Add meaningful labels/debugging aids to help developers inspect hooks usage in DevTools

- [ ] **Bundle Visualizer + Performance Insights**
  - Add real-world render benchmark stats and bundle visualizations
  - Compare against similar hooks/utilities to highlight efficiency

---

## ✧ Exploration Ideas

Early-stage experiments or future-facing concepts worth evaluating.

- [ ] `useStableCallback` - with deep/structural comparison of dependencies
- [ ] `useReducerEqual` - reducer with customizable equality check for state transitions
- [ ] `createGuardedState` - factory to centralize state creation with built-in memo + compare
- [ ] WeakMap/Cache strategy – optional memo cache to reuse previous equality results

---

## ❋ Contributions Welcome

Got ideas, feedback, or use cases that don’t yet exist?
[Open an issue](https://github.com/vaerone/stateiq/issues)
[start a discussion](https://github.com/vaerone/stateiq/discussions)
We’d love your input as stateiq evolves.

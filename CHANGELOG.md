# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.1] - 2025-07-18

### ★ Fixed

- Prevented husky install from running during production installation
- Previously, installing the package as a dependency caused an error because Husky was triggered unnecessarily
- This fix ensures husky runs only during development, improving install experience for consumers

---

This is the **initial release** of `stateiq`.
All core features are well-tested and documented. Feedback and contributions are welcome as we stabilize further.

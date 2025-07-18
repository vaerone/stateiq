import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/hooks/**/*.ts', 'src/utils/**/*.ts'],
      exclude: ['**/*.test.ts', '**/__tests__/**', 'src/index.ts'],
    },
  },
});

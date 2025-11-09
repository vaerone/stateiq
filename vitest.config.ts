import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@stateiq': path.resolve(__dirname, './src'),
      '@internal': path.resolve(__dirname, './src/utils/__internal__'),
    },
  },
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

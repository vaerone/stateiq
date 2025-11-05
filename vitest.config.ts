import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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

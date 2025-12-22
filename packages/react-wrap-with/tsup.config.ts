import { defineConfig } from 'tsup';

export default defineConfig([
  {
    dts: true,
    entry: {
      'react-wrap-with': './src/index.ts'
    },
    format: ['cjs', 'esm'],
    sourcemap: true,
    target: 'esnext'
  }
]);

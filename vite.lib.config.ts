// Library build (npm run build:lib) → dist/. Storybook doesn't use this file.
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Vite library mode emits CSS as a separate file; re-import it from the JS entry
// so consumers get styles with a plain `import { Button } from 'rifbar-ds'`.
function injectCssImport(): Plugin {
  return {
    name: 'inject-css-import',
    enforce: 'post',
    generateBundle(_, bundle) {
      const css = Object.keys(bundle).find((f) => f.endsWith('.css'));
      for (const chunk of Object.values(bundle)) {
        if (css && chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code = `import './${css}';\n${chunk.code}`;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), injectCssImport()],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});

import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import path from 'node:path';
import { createRequire } from 'node:module';

import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, 'cmaps'));

const root = resolve(__dirname, './src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  resolve:{
    alias:{
      definitions: resolve(root, './definitions'),
      utils: resolve(root, './utils'),
      metronic: resolve(root, './_metronic'),
      reduxReducers: resolve(root, './redux/reducers'),
      tableUtils: resolve(root, './providers'),
      formInputs: resolve(root, './_metronic/helpers/components/inputs'),
      table: resolve(root, './_metronic/helpers/components/table'),
      hooks: resolve(root, './hooks'),
    }
  }
})

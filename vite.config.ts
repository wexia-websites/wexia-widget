import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget.ts'),
      name: 'WexiaWidget',
      fileName: 'wexia-widget',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
    // Bundle html2canvas inside — no code splitting
    codeSplitting: false,
  },
})

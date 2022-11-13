import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
      isProduction: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    createHtmlPlugin(),
  ],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 100000,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].min.js',
        preferConst: true,
        freeze: true,
        minifyInternalExports: true,
        sourcemap: false,
        strict: true,
        compact: true,
        manualChunks(id) {
          if (id.includes('vue-echarts'))
            return 'echarts-ui'

          if (id.includes('echarts'))
            return 'echarts-core'

          if (id.includes('vueuse'))
            return 'ui-hooks'

          if (id.includes('vue-router'))
            return 'ui-router'

          if (id.includes('vue'))
            return 'ui-core'

          if (id.includes('firebase'))
            return 'firebase'
        },
      },
    },
  },
})

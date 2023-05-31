import { URL, fileURLToPath } from 'node:url';
import dns from 'node:dns';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

/**
 * Quasar
 * sass@1.32.12 必須使用此版本，可至官網確認是否已經修正
 * import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
 */

/**
 * element plus
 * import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
 */

/**
 * Vuetify
 * import vuetify from 'vite-plugin-vuetify';
 */

import postcssNested from 'postcss-nested';
import viteCompression from 'vite-plugin-compression';

// import gitRevisionVitePlugin from 'git-revision-vite-plugin'

// import type { UserConfig } from 'vite'

dns.setDefaultResultOrder('verbatim');

export default defineConfig(() => {
  /**
   * element plus
   * const ElementPlusSetting = ElementPlusResolver({
      importStyle: 'sass',
    });
   */

  // const env = loadEnv(mode, process.cwd());

  const config = {
    build: {
      sourcemap: true,
    },
    publicDir: 'public',
    base: '/',
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      /**
       * Quasar
       * quasar({
          autoImportComponentCase: 'pascal',
          sassVariables: 'src/quasar-variables.sass'
        }),
       */
      quasar({
        sassVariables: 'src/assets/scss/vendors/quasar-variables.scss',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
          {
            'axios': [
              ['default', 'axios'],
            ],
            'lodash-es': [
              'debounce',
              'cloneDeep',
              'isEmpty',
              'isEqual',
            ],
            'uuid': [
              ['v4', 'uuid'],
            ],
            // '[package-name]': [
            //   '[import-names]',
            //   ['[from]', '[alias]'],
            // ],
          },
        ],
        resolvers: [
          /**
           * element plus
           * ElementPlusSetting,
           */
        ],
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        dts: true,
        dirs: ['src/components/**', 'src/views/**'],
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/,
        ],
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
        resolvers: [
          /**
           * element plus
           * ElementPlusSetting,
           */
        ],
      }),
      viteCompression({}),
      // gitRevisionVitePlugin({
      //   commitHash: false,
      //   branch: false,
      //   lastCommitDateTime: false,
      // }),
      UnoCSS(),
      /**
       * Vuetify
       * vuetify(),
       */
      visualizer(),
    ],
    css: {
      postcss: {
        plugins: [postcssNested],
      },
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8080,
    },
  };

  return config;
});

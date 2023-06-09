/**
 * Quasar
 * import { Quasar } from 'quasar';
 * import '@quasar/extras/material-icons/material-icons.css';
 * import 'quasar/src/css/index.sass';
 */

/**
 * element plus
 * import ElementPlus from 'element-plus';
 * import 'element-plus/dist/index.css';
 */

import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import './style.css';
import './assets/scss/main.scss';
import 'virtual:uno.css';

import { createApp as createBaseApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

const store = createPinia();

/**
 * Vuetify
 * import 'vuetify/styles';
 * import { createVuetify } from 'vuetify';
 * const vuetify = createVuetify();
 */

export function createApp(options, rootProps) {
  const app = createBaseApp(options, rootProps);
  app
    .use(Quasar, { plugins: {} })
    // .use(ElementPlus)
    // .use(vuetify)
    .use(router)
    .use(store);

  return app;
}

const app = createApp(App, {});
app.mount('#app');

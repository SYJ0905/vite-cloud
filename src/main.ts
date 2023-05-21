import { createApp as createBaseApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import './style.css';
import './assets/scss/main.scss';
import App from './App.vue';

const store = createPinia();

export function createApp(options, rootProps) {
  const app = createBaseApp(options, rootProps);
  app
    .use(router)
    .use(store);

  return app;
}

const app = createApp(App, {});
app.mount('#app');

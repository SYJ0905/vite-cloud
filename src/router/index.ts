import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* @vite-ignore */'@/views/index.vue'),
      meta: {},
    },
    {
      path: '/template',
      name: 'template-index',
      component: () => import(/* @vite-ignore */'@/template/index.vue'),
      meta: {},
    },
    {
      path: '/message-board',
      name: 'message-board',
      component: () => import(/* @vite-ignore */'@/views/messageboard.vue'),
      meta: {},
    },
  ],
  scrollBehavior: () => {
    return Object.assign({ left: 0, top: 0 }, { x: 0, y: 0 });
  },
});

router.beforeResolve(() => {
  nextTick().then(() => {
    const title = 'Vite - Cloud';
    document.title = title;
  });
});

export default router;

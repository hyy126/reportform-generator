import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ReportformGenerator from '@/views/generator/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Reportform-Generator',
    meta: {
      title: '报表生成器'
    },
    component: ReportformGenerator
  },
  {
    path: '/preview',
    name: 'Preview',
    meta: {
      title: '预览'
    },
    component: () => import(/* webpackChunkName: "preview" */ '@/views/preview/index.vue')
  },
  {
    path: '/code',
    name: 'Code',
    meta: {
      title: '代码'
    },
    component: () => import(/* webpackChunkName: "code" */ '@/views/code/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title as string;
  }
  next();
})

export default router

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue' // or wherever your page is

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

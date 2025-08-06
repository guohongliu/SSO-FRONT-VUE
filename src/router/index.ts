// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import Admin from '../components/Admin.vue'

const routes = [
  { path: '/', component: Login },
  {
    path: '/admin',
    component: Admin,
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'settings', component: Settings },
      { path: 'logs', component: Logs }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

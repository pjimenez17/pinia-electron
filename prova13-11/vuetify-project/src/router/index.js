// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/LoginScreen.vue')   
  },
  {
    path: '/votacions',
    component: () => import('@/components/VotacionsScreen.vue')   
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

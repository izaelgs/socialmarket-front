import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompleteProfileView from '@/views/auth/CompleteProfileView.vue'
import RegisterViewVue from '@/views/auth/RegisterView.vue'
import LoginViewVue from '@/views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/complete-profile',
      name: 'complete-profile',
      component: CompleteProfileView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterViewVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

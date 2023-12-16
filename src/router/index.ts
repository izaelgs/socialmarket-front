import { createRouter, createWebHistory } from 'vue-router';
import Guard from '@/services/middleware';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'Home',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: './',
          name: 'Home',
          component: () => import('../views/dashboard/HomeView.vue'),
        },
        {
          path: 'edit-profile',
          name: 'Edit Profile',
          component: () => import('../views/dashboard/EditProfileView.vue'),
        }
      ],
      beforeEnter: Guard.auth
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../views/HomeView.vue')
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

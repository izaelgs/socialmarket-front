import { createRouter, createWebHistory } from 'vue-router'
import Guard from '@/services/middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Dashboard/HomeView/Index.vue')
        },
        {
          path: 'edit-profile',
          name: 'Edit Profile',
          component: () => import('@/views/Dashboard/EditProfileView/Index.vue')
        },
        {
          path: 'manage-stores',
          name: 'Manage Stores',
          component: () => import('@/views/Dashboard/Stores/Index.vue')
        },
        {
          path: 'manage-store/:id',
          name: 'Manage Store',
          component: () => import('@/views/Dashboard/Store/Index.vue')
        },
        {
          path: 'recent-products',
          name: 'RecentProducts',
          component: () => import('@/views/Dashboard/RecentProducts/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/Dashboard/Cart/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'order/success',
          name: 'OrderSuccess',
          component: () => import('@/views/Dashboard/Order/Success.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'order/cancel',
          name: 'OrderCancel',
          component: () => import('@/views/Dashboard/Order/Cancel.vue'),
          meta: { requiresAuth: true }
        }
      ],
      beforeEnter: Guard.auth
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPassword.vue')
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/views/auth/ResetPassword.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    }
  ]
})

export default router

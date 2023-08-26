
import { createRouter, createWebHistory } from 'vue-router'
import ViewLayout from "@/layouts/default/ViewLayout.vue";
import AuthLayout from "@/layouts/default/AuthLayout.vue";
import Library from "@/views/LibraryView.vue";
import AuthView from "@/views/AuthView.vue";

const routes = [
  {
    path: '/',
    component: ViewLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Library',
        component: Library,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Auth',
        component: AuthView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')

  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated,
    // redirect to the authentication page
    next('/auth');
  }
  else {
    // Otherwise, proceed to the next route
    next();
  }
});

export default router

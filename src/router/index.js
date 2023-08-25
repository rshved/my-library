
import { createRouter, createWebHistory } from 'vue-router'
import ViewLayout from "@/layouts/default/ViewLayout.vue";
import AuthLayout from "@/layouts/default/AuthLayout.vue";
import Library from "@/views/LibraryView.vue";
import AuthView from "@/views/AuthView.vue";

const routes = [
  {
    path: '/',
    component: ViewLayout,
    children: [
      {
        path: '',
        name: 'Library',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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

export default router

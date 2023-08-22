
import { createRouter, createWebHistory } from 'vue-router'
import ViewLayout from "@/layouts/default/ViewLayout.vue";
import Home from "@/views/LibraryView.vue";

const routes = [
  {
    path: '/',
    component: ViewLayout,
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

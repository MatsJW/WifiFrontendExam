import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import { useAuth } from "@clerk/vue"
import { watch } from "vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { guest: false },
    },
    {
      path: "/signIn",
      name: "signIn",
      component: () => import("../views/SignInView.vue"),
      meta: { guest: true },
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuth()

  // Wait for auth to be loaded
  if (!auth.isLoaded.value) {
    await auth.getToken.value() // Ensure auth is loaded and token is fetched
  }

  const isAuthenticated = auth.isSignedIn.value

  // If trying to access a guest-only page (like signIn) while authenticated
  if (to.meta.guest && isAuthenticated && to.name === "signIn") {
    next("/") // Redirect authenticated users away from guest-only pages
  }
  // If trying to access a protected page while not authenticated
  else if (!to.meta.guest && !isAuthenticated) {
    next("/signIn") // Redirect unauthenticated users to the sign-in page
  }
  // Otherwise, allow the navigation
  else {
    next()
  }
})

export default router

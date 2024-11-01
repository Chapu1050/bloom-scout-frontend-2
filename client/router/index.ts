import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import FriendingComponent from "../components/friending/FriendingComponent.vue";
import LoginView from "../views/LoginView.vue";
import MapView from "../views/MapView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ObservationView from "../views/ObservationListView.vue"; // Import the ObservationView
import PostObservationView from "../views/PostObservationView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: MapView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/post-observation",
      name: "PostObservation",
      component: PostObservationView,
      meta: { requiresAuth: true }, // Require auth
    },
    {
      path: "/map", // Define the path for the map component
      name: "Map",
      component: MapView,
      meta: { requiresAuth: false }, // Set requiresAuth to true or false as needed
    },
    {
      path: "/observations", // Add the route for the ObservationView
      name: "Observations",
      component: ObservationView,
      meta: { requiresAuth: true }, // Require auth for viewing observations
    },
    {
      path: "/friends", // Add the route for the ObservationView
      name: "Friends",
      component: FriendingComponent,
      meta: { requiresAuth: true }, // Require auth for viewing observations
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;

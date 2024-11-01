<script setup lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <div class="app-container">
    <SideBar class="sbar"/> <!-- Sidebar added here -->
    <div class="main-content">
      <header>
        <nav>
          <div class="title">
            <img src="@/assets/images/logo.svg" />
            <RouterLink :to="{ name: 'Map' }">
              <h1>BloomScout</h1>
            </RouterLink>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'Map' }" :class="{ underline: currentRouteName === 'Home' }"> Home </RouterLink>
            </li>
            <li v-if="isLoggedIn">
              <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName === 'Settings' }"> Settings </RouterLink>
            </li>
            <li v-else>
              <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName === 'Login' }"> Login </RouterLink>
            </li>
          </ul>
        </nav>
        <article v-if="toast !== null" class="toast" :class="toast.style">
          <p>{{ toast.message }}</p>
        </article>
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #f2e8cf;
  margin-left: var(--sidebar-width); /* Margin to accommodate the fixed sidebar */
}

header {
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it is above other elements */
  background-color: white;
}

nav {
  padding: 1em 2em;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
  color: #bc4749; /* Title color */
}

.sbar {
  z-index: 3;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: #bc4749; /* Change link text color to #bc4749 */
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}

main {
  margin-top: 64px; /* Add space for the fixed navbar */
  padding: 20px; /* Add padding to the main content */
}
</style>

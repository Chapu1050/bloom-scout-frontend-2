<script setup lang="ts">
import PostObservation from "@/components/Observe/PostObservation.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Post an Observation</h1>
    <section class="content">
      <h1 v-if="!isLoggedIn">Please log in to post an observation!</h1>
      
      <!-- PostObservation Component -->
      <PostObservation v-if="isLoggedIn" class="post-observation"/>
      <p v-else>Please log in to access the observation form.</p>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center main content horizontally */
  justify-content: center; /* Center main content vertically */
  overflow-y: hidden;
}

h1 {
  text-align: center;
  color: #bc4749;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content section horizontally */
}

.post-observation {
  width: 300%; /* Set width to 70% */
}

/* Add this class to ensure the content inside PostObservation is left-aligned */
.post-observation * {
  text-align: left; /* Left-align text in all child elements */
}
</style>



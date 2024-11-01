<template>
  <section>
    <h1>Your Observations</h1>
    <ObservationListComponent :observations="observations" />
    <p v-if="loaded && observations.length === 0">No observations found.</p>
    <p v-else-if="!loaded">Loading...</p>
  </section>
</template>

<script setup lang="ts">
import ObservationListComponent from "@/components/Observe/ObservationListComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from 'vue';

const loaded = ref(false);
const observations = ref<Array<Record<string, string>>>([]);

async function getObservations() {
  try {
    const results = await fetchy(`/api/observations/user`, "GET"); 
    observations.value = results;
  } catch (error) {
    console.error("Error fetching observations:", error);
  } finally {
    loaded.value = true;
  }
}

onBeforeMount(() => {
  getObservations();
});
</script>

<style scoped>
section {
  margin: 0 auto;
  max-width: 60em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>

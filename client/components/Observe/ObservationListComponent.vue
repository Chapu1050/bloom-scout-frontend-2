<script setup lang="ts">
import { useUserStore } from '@/stores/user'; // Assuming you have a user store
import { fetchy } from '@/utils/fetchy'; // Adjust the path as needed
import { onMounted, ref } from 'vue';
import ObservationComponent from './ObservationComponent.vue';

const userStore = useUserStore();
const observations = ref<Array<Record<string, any>>>([]); // Ref to hold observations

// Function to fetch observations made by the user
const fetchObservations = async () => {
  try {
    const response = await fetchy(`/api/observations/user`, 'GET');
    observations.value = response;
  } catch (error) {
    console.error('Failed to fetch observations:', error);
  }
};

// Fetch observations when the component is mounted
onMounted(() => {
  fetchObservations();
});
</script>

<template>
    <div class="observation-list">
      <ObservationComponent
        v-for="observation in observations"
        :key="observation.id"
        :observation="observation"
      />
      <p v-if="!observations.length">No observations found.</p>
    </div>
</template>

<style scoped>
.observation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
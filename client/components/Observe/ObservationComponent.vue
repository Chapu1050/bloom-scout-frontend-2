<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["observation"]);

</script>

<template>
  <div class="observation-container">
    <h1>{{ observation.title }}</h1>
    <img v-if="observation.imageUrl" :src="observation.imageUrl" alt="Observation Image" class="observation-image" />
    <p>{{ observation.content }}</p>
    <div class="timestamp">
      <p>Created on: {{ formatDate(observation.dateCreated) }}</p>
      <p>
        Location: 
        <span class="location">
          Latitude: {{ observation.location.latitude.toFixed(2) }}, 
          Longitude: {{ observation.location.longitude.toFixed(2) }}
        </span>
      </p>
    </div>
    <label>
    </label>
  </div>
</template>



<style scoped>
.observation-container {
  background-color: white;
  border-radius: 1em;
  padding: 1em;
  margin: 1em 0; /* Add margin for spacing */
}

h1 {
  margin-bottom: 0.5em; /* Spacing below title */
}

p {
  margin: 0.5em 0; /* Add spacing for paragraphs */
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

.description {
  margin: 0.5em 0; /* Add margin for description */
}

.timestamp {
  font-size: 0.9em;
  font-style: italic;
  margin-top: 0.5em;
}

.observation-image {
  width: 30%;
  height: auto;
  border-radius: 8px;
  margin-top: 0.5em;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

// Reactive state variables
const observationType = ref("organism"); // Default to organism
const title = ref(""); // New title field
const description = ref(""); // Flat description field
const latitude = ref("");
const longitude = ref("");
const imageUrl = ref(""); // Optional image URL
const emit = defineEmits(["refreshObservations"]);

const createObservation = async () => {
  console.log("Sending title:", title.value);
  console.log("Sending description:", description.value);
  console.log("Sending location:", {
    latitude: parseFloat(latitude.value),
    longitude: parseFloat(longitude.value),
  });

  // Prepare the body for the fetch request
  const body = {
    title: title.value, // Include title in the body
    description: description.value, // Send the flat description
    latitude: parseFloat(latitude.value), // Send latitude
    longitude: parseFloat(longitude.value), // Send longitude
    ...(imageUrl.value && { imageUrl: imageUrl.value }), // Include imageUrl if provided
  };

  try {
    await fetchy("/api/observations", "POST", {
      body,
    });
  } catch (error) {
    console.error("Error sending observation:", error);
    return;
  }

  emit("refreshObservations");
  emptyForm();
};

// Clear the form inputs
const emptyForm = () => {
  observationType.value = "organism"; // Reset to default
  title.value = ""; // Clear title
  description.value = ""; // Clear description
  latitude.value = "";
  longitude.value = "";
  imageUrl.value = ""; // Clear image URL
};



</script>

<template>
  <form @submit.prevent="createObservation">
    <label for="title">Title:</label>
    <input
      type="text"
      v-model="title"
      id="title"
      placeholder="Enter observation title"
      required
    />

    <label for="observationType">Observation Type:</label>
    <select v-model="observationType" id="observationType" required>
      <option value="organism">Organism</option>
      <option value="structure">Structure</option>
    </select>

    <label for="description">Observation Description:</label>
    <textarea
      v-model="description"
      id="description"
      placeholder="Enter a detailed observation"
      required
    ></textarea>

    <label for="latitude">Latitude:</label>
    <input
      type="number"
      v-model="latitude"
      id="latitude"
      placeholder="Enter latitude"
      step="0.000001"
      required
    />

    <label for="longitude">Longitude:</label>
    <input
      type="number"
      v-model="longitude"
      id="longitude"
      placeholder="Enter longitude"
      step="0.000001"
      required
    />

    <label for="imageUrl">Image URL (optional):</label>
    <input
      type="text"
      v-model="imageUrl"
      id="imageUrl"
      placeholder="Enter an optional image URL"
    />

    <button type="submit" class="submit-button">
      Submit Observation
    </button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  width: 70%;
}

textarea,
input,
select {
  font-family: inherit;
  font-size: inherit;
  padding: 0.5em;
  border-radius: 4px;
}

textarea {
  height: 6em; /* Ensure height matches the post textarea */
  resize: none;
}

.submit-button {
  background-color: #A7C957; /* Set button color */
  color: white; /* Text color */
  padding: 0.5em; /* Padding */
  border: none; /* Remove default border */
  border-radius: 4px; /* Match other input styles */
  cursor: pointer; /* Change cursor on hover */
}

.submit-button:hover {
  background-color: #8FAE47; /* Darken button on hover */
}
</style>

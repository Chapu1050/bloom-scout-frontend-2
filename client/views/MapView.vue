<script setup>
import { onMounted, ref } from 'vue';
import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map';

const center = { lat: 42.3601, lng: -71.0942 }; // Default center
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Your API key
const allObservations = ref([]); // All observations
const userObservations = ref([]); // User's observations
const filteredObservations = ref([]); // Currently displayed observations
const showUserObservations = ref(false); // Toggle for user observations
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: 'greedy',
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

// Fetch all observations from your API
const fetchObservations = async () => {
  try {
    const response = await fetch('/api/observations'); // Update with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch observations');
    }
    allObservations.value = await response.json();
    await addUsernameToObservations(allObservations.value); // Add usernames to observations
    filteredObservations.value = allObservations.value; // Initialize filtered observations
  } catch (error) {
    console.error(error); // Handle the error as needed
  }
};

const fetchUsernameFromId = async (id) => {
  try {
    const response = await fetch(`/api/username/${id}`); // Update with your actual API endpoint
    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
    const userData = await response.json();
    return userData.username;
  } catch (error) {
    console.error(error); // Handle the error as needed
    return 'Unknown'; // Fallback if user not found
  }
};

// Fetch user observations from your API
const fetchUserObservations = async () => {
  try {
    const response = await fetch('/api/observations/user'); 
    if (!response.ok) {
      throw new Error('Failed to fetch user observations');
    }
    userObservations.value = await response.json();
    await addUsernameToObservations(userObservations.value); // Add usernames to user observations
  } catch (error) {
    console.error(error); // Handle the error as needed
  }
};

// Fetch username for each observation and add it to the observation
const addUsernameToObservations = async (observations) => {
  for (const observation of observations) {
    observation.username = await fetchUsernameFromId(observation.userId);
  }
};

// Toggle observation filter
const toggleObservations = () => {
  showUserObservations.value = !showUserObservations.value;
  filteredObservations.value = showUserObservations.value ? userObservations.value : allObservations.value;
};

onMounted(async () => {
  await fetchObservations();
  await fetchUserObservations();
});
</script>

<template>
  <div class="map-container">
    <div class="sidebar">
      <button @click="toggleObservations" class="toggle-button">
        {{ showUserObservations ? 'Show All Observations' : 'Show My Observations' }}
      </button>
    </div>
    <GoogleMap
      :api-key="apiKey"
      style="width: 100%; height: 100%"
      :center="center"
      :zoom="15"
      :options="mapOptions"
    >
      <Marker
        v-for="observation in filteredObservations"
        :key="observation.id"
        :options="{ position: { lat: observation.location.latitude, lng: observation.location.longitude } }"
        :title="observation.title"
      >
        <!-- Show InfoWindow only if it is the selected observation -->
        <InfoWindow>
          <div class="info-window-content">
            <h3>{{ observation.title }}</h3>
            <p>{{ observation.content }}</p>
            <p><strong>Posted by:</strong> {{ observation.username }}</p> <!-- Display username -->
            <img v-if="observation.imageUrl" :src="observation.imageUrl" alt="Observation Image" class="observation-image" />
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>

<style scoped>

.toggle-button {
  position: absolute;
  z-index: 1;
  right: 8%; /* Distance from the right */
  top: 16%; /* Distance from the top */
  background-color: #A7C957; /* Button background color */
  color: #ffffff; /* Button text color */
  border: none; /* Remove default border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 15px; /* Padding for the button */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Change cursor on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
  transition: background-color 0.3s, transform 0.3s; /* Transition effects */
}

.toggle-button:hover {
  background-color: #8FAE47; /* Darker shade on hover */
  transform: translateY(-2px); /* Slight lift on hover */
}

.map-container {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.info-window-content {
  max-width: 200px;
}

.observation-image {
  width: 100%;
  height: auto;
  margin-top: 0.5em;
  border-radius: 8px;
}
</style>
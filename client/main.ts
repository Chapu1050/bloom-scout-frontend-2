import "@/assets/main.css";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "purecss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const apiKey = "AIzaSyAPXmxyv4aAVoGAksTMoqkF-YxTqWcBalw"; // Ensure you have your key set in .env
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
document.head.appendChild(script);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);

app.mount("#app");

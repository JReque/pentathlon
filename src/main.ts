import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@router/index";

// Import the CSS file with font declarations
import "./assets/main.css";

// Create the Vue application
const app = createApp(App);

// Use Pinia
app.use(createPinia());

// Add other plugins as needed
app.use(router);

// Mount the app
app.mount("#app");

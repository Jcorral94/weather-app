import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueApexCharts from "vue3-apexcharts";

createApp(App)
  .use(router)
  .use(VueApexCharts)
  .mount("#app");

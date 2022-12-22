import API from "../lib/API.js";
import { reactive, watch } from "vue";

function useCity(city) {

  const data = reactive({
    results: {},
    error: null,
    loading: true
  });

  async function getCity() {
    try {
      data.loading = true;
      data.results = {};
      data.error = null;

      const results = await API.getCity({ city });
      // console.log(`Get City:: ${JSON.stringify(results)}`);
      // TODO: 
      // get the lat & long from results
      // make a new request to : https://api.open-meteo.com/v1/forecast?latitude=33.44&longitude=-112.36&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,visibility,winddirection_180m,windgusts_10m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&past_days=5
      data.results = results;
    } catch (e) {
      data.error = e;
    }
    data.loading = false;
  }

  watch(city, getCity, { immediate: true });

  return data;
}

export {
  useCity
}

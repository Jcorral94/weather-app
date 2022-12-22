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

      data.results = await API.getCity({ city: city.value });
      
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

import API from "../lib/API.js";
import { reactive, watch } from "vue";

export default function useCity(city) {

  const data = reactive({
    results: {},
    cache: {},
    error: null,
    loading: true
  });

  async function getCity() {
    try {
      data.loading = true;
      data.results = {};
      data.error = null;

      const fin = await API.getCity({ city: city.value });

      if(!fin) return;

      data.results = fin;

      // When using autocomplete the value for the input changes and because api is using 
      // city and the input value changes to city state we lose visibility

      if (data.results) {
        data.cache = data.results;
      } else {
        data.cache = data.cache;
      }



    } catch (e) {
      data.error = e;
    } finally {
      if (data.results !== null) {
        data.loading = false;
      }
    }
  }

  watch(city, getCity, { immediate: true });

  return data;
}

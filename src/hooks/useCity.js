import API from "../lib/API.js";
import { reactive, watch } from "vue";

function useCity(city) {

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

      data.results = fin;

      //have to handle autocomplete update
      //TODO: come up with a better solution

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

export {
  useCity
}

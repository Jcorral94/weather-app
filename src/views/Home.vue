<script setup>
import { ref } from "vue";
import { useCity } from "../hooks/useCity.js";
import API from "../lib/API.js";

const city = ref(null);
const selectedCity = useCity(city);
const clickedDropDown = ref(false);

/* Current problem: When I select the city with the state it updates the input. and when running autocomplete no results are retrieved when change */

/* TODO: turn this into a state variable and create API Request */
const searchResults = ref(null);
const weather = ref(null);

async function updateSearchResults() {
  //grab the cache, assume once we click on the auto-complete that it will fail to find the right city
  searchResults.value = selectedCity.cache[city.value];
  //get the weather for that lat and long
  weather.value = await API.getWeather({lat: searchResults.value.latitude, long: searchResults.value.longitude});

}
</script>

<template>
  <!-- Todo: Fix the city list. It's not centered with the input -->
  <div class="weather">
    <div class="header">
      <h2>Weather App</h2>
    </div>
    <div class="container">
      <div class="form-floating">
        <input
          type="text"
          v-model="city"
          class="form-control"
          id="floatingInput"
          placeholder="New York"
          list="datalistOptions"
        />
        <label for="floatingInput">Enter a city</label>
      </div>
      <div class="mt-2">
        <button @click="updateSearchResults" class="btn btn-primary">
          Submit
        </button>
      </div>
      <div>
        <datalist id="datalistOptions">
          <option
            v-for="c in selectedCity.results"
            :key="c.id"
            :value="c.name + ' ' + c.admin1"
          />
        </datalist>
      </div>
    </div>

    <div v-if="weather">
      <div class="current-weather"> {{ weather.current_weather.temperature }}</div>
    </div>
<!-- 
    <pre>
      {{ JSON.stringify(weather, null, 2) }}
    </pre> -->
  </div>
</template>


<style scoped>
label {
  padding: 5px;
}
p {
  width: 100%;
  height: 100%;
}

.cities:hover {
  color: #0d6efd;
  text-decoration: dashed;
  cursor: pointer;
}

.cities {
  width: 100%;
  padding: 7px;
  transition: 0.2s all;
  margin-left: 11px;
}

#city {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 2px;
}

#list {
  width: 228px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  font-size: 12px;
  /* border: 1px solid #f1f1f1; */
}
.container {
  margin-left: 63px;
}
</style>
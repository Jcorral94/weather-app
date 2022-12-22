<script setup>
import { ref } from "vue";
import { useCity } from "../hooks/useCity.js";

const city = ref(null);
const selectedCity = useCity(city);

function getCity() {
  // TODO: Once we click a div get the lat and long & make request to weather
  // FYI - makes a request to state after 4 letters to compile city list
  console.log(selectedCity.results);
}
</script>

<template>
  <!-- Todo: Fix the city list. It's not centered with the input -->
  <div class="weather">
    <div class="header">
      <h2>Weather App</h2>
    </div>
    <div class="selectCityForm">
      <label for="city">
        Enter City:
        <input id="city" type="text" v-model="city" />
      </label>
      <button @click="getCity" class="btn btn-primary btn-sm">Submit</button>
    </div>
    <div id="list" v-if="selectedCity?.results">
      <div class="cities" v-for="cityItem in selectedCity.results" :key="cityItem.id">
        {{ cityItem.name }} - {{ cityItem.admin1 }}
      </div>
    </div>
  </div>
</template>


<style>
.selectCityForm {
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  padding: 5px;
}

.cities:hover {
  background-color: #0d6efd;
  color: white;
}

.cities {
  width: 100%;
  padding: 5px;
  transition: 0.5s all;
}

#city {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 2px;
}

#list {
  width: 228px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  font-size: 12px;
}
</style>
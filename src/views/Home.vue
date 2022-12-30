<script setup>
import { ref, reactive, computed } from "vue";
import useCity from "../hooks/useCity";
import API from "../lib/API";
import weatherCode from "../lib/weatherCode";

const city = ref("");
const searchResults = ref(null);
const weather = ref(null);
const selectedCity = useCity(city);

const weatherImage = reactive({
  id: null,
  value: "",
  fileType: ""
});

const updatedWeather = computed(()=> {
  // i want an {} in an array with the data on an hourly basis
  const acc = [];
  const hourlyData = weather.value.hourly;
  
  //create a foor loop on one of the properties and then extract the rest

  hourlyData.time.forEach((value, index)=>{
    acc.push({
      time: value
      , temperature_2m: hourlyData.temperature_2m[index]
      , relativehumidity_2m: hourlyData.relativehumidity_2m[index]
      , apparent_temperature: hourlyData.apparent_temperature[index]
      , visibility: hourlyData.visibility[index]
      , winddirection_180m: hourlyData.winddirection_180m[index]
      , windgusts_10m: hourlyData.windgusts_10m[index]
      , weathercode: hourlyData.weathercode[index]
    });
  });

  return acc;
});

async function updateSearchResults() {
  //grab the cache, assume once we click on the auto-complete that it will fail to find the right city
  searchResults.value = selectedCity.cache[city.value];
  //get the weather for that lat and long
  weather.value = await API.getWeather({
    lat: searchResults.value.latitude,
    long: searchResults.value.longitude,
  });

  //get the current weather code to get image
  const imgId = weather.value.current_weather.weathercode;

  const doesImageExist = weatherCode.has(imgId);

  if (!doesImageExist) return;

    weatherImage.value = weatherCode.get(imgId);

    const hasFileType = weatherImage.value.indexOf(".");
    
    if(hasFileType >= 0) {
      weatherImage.fileType = weatherImage.value.slice(hasFileType + 1, weatherImage.value.length);
      weatherImage.value = weatherImage.value.slice(0, hasFileType);
    } else {
      weatherImage.fileType = "jpeg";
    }

    //update the weather
    console.log(weather.value);
}
</script>

<template>
  <!-- Todo: Fix the city list. It's not centered with the input -->
  <main class="weather">
    <header class="header">
      <h1 class="display-4 fw-normal">Weather App</h1>
    </header>
    <section class="form">
      <form class="container" @submit.prevent="">
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
      </form>
    </section>
    <section v-if="weather" class="results">
      <article class="current-weather">
        <div class="degrees-and-image">
          <div class="current-degrees">
            {{ weather.current_weather.temperature }}
          </div>
          <div class="current-weather-image">
            <img
              :src="'./src/assets/weather-icons/' + weatherImage.value + '.' + weatherImage.fileType"
              alt="Weather image"
            />
          </div>
        </div>
        <div class="other-elements">
          <div class="current-weather-sub">
            Wind Direction: {{ weather.current_weather.winddirection }}
          </div>
          <div class="current-weather-sub">
            Wind Speed: {{ weather.current_weather.windspeed }}
          </div>
        </div>
      </article>
      <article class="hourly-trend" v-if="updatedWeather">
        <table>
          <thead>
            <tr>
              <th>
                Time
              </th>
              <th>
                Temperature
              </th>
              <th>
                Humidity
              </th>
              <th>
                Apparent Temperature
              </th>
              <th>
                Visibility
              </th>
              <th>
                Weather Code
              </th>
              <th>
                Wind Direction
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, temperature_2m, relativehumidity_2m, apparent_temperature, time, visibility, weathercode, winddirection_180m } in updatedWeather" :key="id">
              <td class="sub-section time">
                {{ time }}
              </td>
              <td class="sub-section temperature">
                {{ temperature_2m }}
              </td>
              <td class="sub-section humidity">
              {{ relativehumidity_2m }}
              </td>
              <td class="sub-section apparent">
                {{ apparent_temperature }}
              </td>
              <td class="sub-section visibility">
                {{ visibility }}
              </td>
              <td class="sub-section weatherid">
                {{ weathercode }}
              </td>
              <td class="sub-section direction">
                {{ winddirection_180m }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="hourData" >
        </div>
      </article>
    </section>
    <!-- 
    <pre>
      {{ JSON.stringify(weather, null, 2) }}
    </pre> -->
  </main>
</template>


<style>
* {
  font-family: Monaco;
}

.degrees-and-image, .other-elements{
  padding: 40px;
  width: 50%;
}
.other-elements{
  font-size: 20px;
}
.hourData{
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hourly-trend{
  width: 90%;
}
td {
  padding: 5px;
  text-align: center;
}
table{
  width: 100%;
}

thead tr th, tbody tr td{
  border: 1px solid rgb(236, 239, 243);
}
thead tr th {
  padding: 15px;
}

tbody tr td{
  font-family: 12px;
}

.degrees-and-image{
  display:flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  border-right: 1px solid rgb(236, 239, 243);
  font-size: 30px;
}
.current-weather{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.results{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
label {
  padding: 5px;
}
p {
  width: 100%;
  height: 100%;
}
img {
  width: 2rem;
  height: 2rem;
}

.cities:hover {
  color: #0d6efd;
  text-decoration: dashed;
  cursor: pointer;
}
h1 {
  color: rgb(44, 42, 42);
  padding: 10px;
  text-align: center;
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
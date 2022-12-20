<script setup>
import {useWeather} from "../hooks/useCity.js";

const weatherState = useWeather("Goodyear");
</script>

<template>
  <pre>
    {{ JSON.stringify(weatherState, null, 2) }}
  </pre>
</template>


<style>
</style>
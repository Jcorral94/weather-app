export default {
  async getCity({ name = "", city } = {}) {
    try {

      if (city.value == null || city.value.trim().length === 0 || city.value.trim().length < 4) return;

      const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city.value}`;
      const request = await fetch(API_URL);
      const json = await request.json();

      if (request.ok) {
        return json.results;
      } else {
        const error = new Error(`Failed to fetch data.. Response from API: ${json}`);
        throw Error(error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getWeather() {

  }
}
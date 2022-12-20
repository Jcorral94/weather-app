export default {
  async getWeather({ name = "weather based on geolocation", city } = {}) {
    try {

      const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=Goodyear`;
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
  }
}
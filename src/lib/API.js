export default {
  async getCity({ name = "", city } = {}) {
    try {

      if (city == null || city.trim().length < 4) return;

      const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
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
      // console.log(`Get City:: ${JSON.stringify(results)}`);
      // TODO: 
      // get the lat & long from results
      // make a new request to : https://api.open-meteo.com/v1/forecast?latitude=33.44&longitude=-112.36&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,visibility,winddirection_180m,windgusts_10m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&past_days=5
      
  }
}
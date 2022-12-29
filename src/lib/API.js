export default {
  async getCity({ name = "", city } = {}) {
    try {

      if (city == null || city.trim().length < 4) return;

      const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
      const request = await fetch(API_URL);
      const json = await request.json();

      if (request.ok) {
        return json.results?.reduce((results, city)=>{
          results = results || {};

          results[city.name + ' ' + city.admin1] = city;

          return results;
        }, {});
      } else {
        const error = new Error(`Failed to fetch data.. Response from API: ${json}`);
        throw Error(error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getWeather({ name = "", lat, long } = {}) {
    try {
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,visibility,winddirection_180m,windgusts_10m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&past_days=5`;

      const response = await fetch(API_URL);
      const json = await response.json();

      if (response.ok) {
        return json;
      } else {
        const error = new Error(`Failed to fetch data.. Response from API: ${json}`);
        throw Error(error);
      }
    } catch (e) {
      console.error(e);
    }
  },

};

// const getCity = async({name="", city}) => {
//   try {

//     if (city == null || city.trim().length < 4) return null;

//     const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
//     const request = await fetch(API_URL);
//     const json = await request.json();

//     if (request.ok) {

//       return json.results?.reduce((results, city) => {
//         results = results || {};
//         results[city.name + ' ' + city.admin1] = city;
//         return results;
//       }, {});

//     } else {
//       const error = new Error(`Failed to fetch data.. Response from API: ${json}`);
//       throw Error(error);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// const getWeather = async(lat, long) =>{
//   try {
//     const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,visibility,winddirection_180m,windgusts_10m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&past_days=5`;

//     const response = await fetch(API_URL);
//     const json = await response.json();

//     if(response.ok){
//       return json;
//     } else {
//       const error = new Error(`Failed to fetch data.. Response from API: ${json}`);
//       throw Error(error);
//     }
//   } catch(e){
//     console.error(e);
//   }
// }

// export {
//   getCity
//   , getWeather
// }
export default new Map([
  [0, 'clear-sky'],
  [1, 'partly-cloud.png'],
  [2, 'partly-cloud.png'],
  [3, 'partly-cloud.png'],
  [45, 'fog'],
  [48, 'fog'],
  [51, 'drizzle'],
  [53, 'drizzle'],
  [55, 'drizzle'],
  [56, 'frozen-drizzle'],
  [57, 'frozen-drizzle'],
  [61, 'rain'],
  [63, 'rain'],
  [65, 'rain'],
  [66, 'frozen-drizzle'],
  [67, 'frozen-drizzle'],
  [71, 'snowfall'],
  [73, 'snowfall'],
  [75, 'snowfall'],
  [77, 'snow-grain'],
  [80, 'rain'],
  [81, 'rain'],
  [82, 'rain'],
  [85, 'snowfall'],
  [86, 'snowfall'],
  [95, 'thunder-storm'],
  // these include hail go back & update
  [96, 'thunder-storm'],
  [99, 'thunder-storm'],
]);

/*
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/
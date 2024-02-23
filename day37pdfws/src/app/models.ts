//create an intermediate interface in the same structure as the api to destructure it properly -_-

export interface ApiData {
  lat: number;
  lon: number;
}
export interface CityData {
  name: string;
  temp: number;
  tempFeelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: number;
}
export interface CityName{
  name: string
}


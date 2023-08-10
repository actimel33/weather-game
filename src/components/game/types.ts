export interface ICityWeatherData {
  main: {
    temp: number;
  };
  id: number;
  name: string;
}

export interface ICityData {
  name: string;
  temp: number;
  id: number;
}

export interface IUserGuesses {
  user: number;
  actual: number;
  guessed: boolean;
  id: number;
  cityName: string;
}

export interface IWeatherServiceClass {
  getWeather(city: string, apiKey: string): Promise<ICityWeatherData>;
}

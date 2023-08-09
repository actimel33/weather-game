import { ICityWeatherData } from '../components/game/types';

const useWeatherServiceHook = () => {
  const apiKey: string = 'b355db3a8217ae32abe405b8021b20a5';

  const getWeather = async (cityName: string): Promise<ICityWeatherData> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    const data = await response.json();

    return data;
  };

  return {
    getWeather,
  };
};

export default useWeatherServiceHook;

import { ICityWeatherData } from '../components/game/types';

const useWeatherServiceHook = (setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  const apiKey: string = 'b355db3a8217ae32abe405b8021b20a5';

  const getWeather = async (cityName: string): Promise<ICityWeatherData | null> => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
      const data = await response.json();

      return data;
    } catch (error: any) {
      console.warn(error.message);

      setError(error.message);
      return null;
    }
  };

  return {
    getWeather,
  };
};

export default useWeatherServiceHook;

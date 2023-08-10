import { useState } from 'react';
import { ICityWeatherData } from '../components/game/types';

const useWeatherServiceHook = (setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async (cityName: string): Promise<ICityWeatherData | null> => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_WEATER}`,
      );
      const data = await response.json();

      // Uncomment next line to imitate slow connection
      // await new Promise(res => setTimeout(res, 1000));

      setIsLoading(false);

      return data;
    } catch (error: any) {
      console.warn(error.message);

      setIsLoading(false);
      setError(error.message);
      return null;
    }
  };

  return {
    getWeather,
    isLoading,
  };
};

export default useWeatherServiceHook;

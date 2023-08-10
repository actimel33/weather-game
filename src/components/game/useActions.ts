import { useCallback } from 'react';
import { ICityData, ICityWeatherData, IUserGuesses } from './types';

import dictionary from '../../helpers/dictionary.json';

const { TEMPERATURE_INPUT_PLACEHOLDER } = dictionary;

const useActions = ({
  getWeather,
  setCitiesData,
  setUserGuesses,
  setResult,
}: {
  getWeather: (cityName: string) => Promise<ICityWeatherData | null>;
  setCitiesData: React.Dispatch<React.SetStateAction<ICityData[]>>;
  setUserGuesses: React.Dispatch<React.SetStateAction<IUserGuesses[]>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // Generate object with user guess temperature, actual adn deviation
  const fetchCityData = useCallback(
    async (cityName: string) => {
      const data = await getWeather(cityName);

      if (!data) {
        return null;
      }

      const processedData = {
        name: cityName,
        temp: Math.round(data.main.temp - 273.15),
        id: data?.id,
      };

      setCitiesData(preState => [...preState, processedData]);

      return processedData;
    },
    [getWeather, setCitiesData],
  );

  const handleGuess = useCallback(
    async (cityName: string, userTemp: number) => {
      const cityRes = await fetchCityData(cityName);
      if (cityRes) {
        const actualTemp = cityRes.temp;
        const deviation = Math.abs(actualTemp - userTemp);

        setUserGuesses(prevGuesses => {
          return [
            ...prevGuesses,
            { user: userTemp, actual: actualTemp, guessed: deviation <= 5, id: cityRes.id, cityName },
          ];
        });
      }
    },
    [fetchCityData, setUserGuesses],
  );

  const resetGame = useCallback(() => {
    setUserGuesses([]);
    setResult('');
  }, [setResult, setUserGuesses]);

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>, cityName: string, val: number) => {
      if (e.target.value) {
        e.target.disabled = true;
        handleGuess(cityName, val);
      } else {
        e.target.placeholder = TEMPERATURE_INPUT_PLACEHOLDER;
      }
    },
    [handleGuess],
  );

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, cityName: string, val: number) => {
      if (event.key === 'Enter' && !!event.currentTarget.value) {
        event.currentTarget.disabled = true;
      }
    },
    [],
  );

  const onFocusHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.placeholder = '';
  }, []);

  return { resetGame, onBlurHandler, onFocusHandler, onKeyDownHandler };
};

export default useActions;

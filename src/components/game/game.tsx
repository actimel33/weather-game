import { memo, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import useWeatherServiceHook from '../../lib/useWeatherServiceHook';
import Button from '../button';
import TemperatureInput from '../temperature-input/temperature-input';
import dictionary from '../../helpers/dictionary.json';
import { ICityData, IUserGuesses } from './types';
import Answer from '../answer';

const Game = () => {
  const { GAME_TITLE, RESTART_BUTTON_TEXT, NO_CITIES } = dictionary;

  const [citiesData, setCitiesData] = useState<ICityData[]>([]);
  const [userGuesses, setUserGuesses] = useState<IUserGuesses[]>([]);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { getWeather } = useWeatherServiceHook(setError);

  // Generate object with user guess temperature, actual adn deviation
  const handleGuess = (city: ICityData, userTemp: number) => {
    const actualTemp = city.temp;
    const deviation = Math.abs(actualTemp - userTemp);

    setUserGuesses(prevGuesses => {
      return [...prevGuesses, { user: userTemp, actual: actualTemp, guessed: deviation <= 5, id: city.id }];
    });
  };

  // Handle debounce to add possibility enter more than 1 number
  const debouncedHandleGuess = useDebouncedCallback(handleGuess, 400);

  // Adds reset game function
  const resetGame = useCallback(() => {
    setUserGuesses([]);
    setResult('');
  }, []);

  useEffect(() => {
    // Retrieves data for the game before it began
    const fetchCityData = async () => {
      const cityNames = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
      const cityPromises = cityNames.map(async city => {
        const data = await getWeather(city);

        if (!data) {
          return null;
        }

        return {
          name: city,
          temp: Math.round(data.main.temp - 273.15),
          id: data?.id,
        };
      });

      const cityData = await Promise.all(cityPromises);

      const filteredCityData = cityData.filter((item: ICityData | null) => item ?? item) as ICityData[];

      setCitiesData(filteredCityData);
    };

    fetchCityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Hook to compare user guesses with actual temperature, to show the result of the game
    const guessed = userGuesses.filter(el => el.guessed);
    if (userGuesses.length === citiesData.length && citiesData.length) {
      if (guessed.length >= 3) {
        setResult('You Win!');
      } else {
        setResult('You Lose!');
      }
    }
  }, [userGuesses, citiesData]);

  useEffect(() => {
    // Hook to handle errors
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center pt-4  flex-col">
      <div className="bg-white p-6 rounded shadow-lg h-96 min-h-full max-w-xs flex flex-col justify-around">
        <h1 className="md:text-xl lg:text-xl  font-semibold mb-4 text-gray-600 uppercase ">{GAME_TITLE}</h1>
        <div>
          {!result &&
            citiesData.map(city => (
              <TemperatureInput
                city={city}
                key={city.id}
                inputProps={{
                  disabled: userGuesses.some(el => el.id === city.id),
                  onChange: e => debouncedHandleGuess(city, parseInt(e.target.value)),
                  id: city.id.toString(),
                }}
              />
            ))}
          {!citiesData.length && (
            <p className="mt-4 mb-7 font-semibold text-xl text-center text-gray-500">{NO_CITIES}</p>
          )}
        </div>
        {result && <p className="mt-4 mb-7 font-semibold text-xl text-center text-green-500">{result}</p>}
        {result && (
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold" onClick={resetGame}>
            {RESTART_BUTTON_TEXT}
          </Button>
        )}
      </div>
      <div className="mt-8">
        {userGuesses.map(item => (
          <Answer userAnswer={item.user} actualTemp={item.actual} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default memo(Game);

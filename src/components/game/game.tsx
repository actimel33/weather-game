import { memo, useEffect, useState } from 'react';

import useWeatherServiceHook from '../../lib/useWeatherServiceHook';
import Button from '../button';
import TemperatureInput from '../temperature-input/temperature-input';
import dictionary from '../../helpers/dictionary.json';
import citiesNamesArray from '../../helpers/cities-names';
import { ICityData, IUserGuesses } from './types';
import Answer from '../answer';
import backgroundImage from '../../images/weather-app.png';
import useActions from './useActions';
import Spinner from '../spinner';
import chooseRandomElements from '../../lib/useChooseRandomElements';
import state from '../../store';
import { useSnapshot } from 'valtio';

const { GAME_TITLE, RESTART_BUTTON_TEXT, NO_CITIES, USER_WIN_MSG, USER_LOSE_MSG, TEMPERATURE_INPUT_PLACEHOLDER } =
  dictionary;

const Game = () => {
  const [citiesData, setCitiesData] = useState<ICityData[]>([]);
  const [cityNames] = useState<string[]>(() => chooseRandomElements(citiesNamesArray, 5));
  const [userGuesses, setUserGuesses] = useState<IUserGuesses[]>([]);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { getWeather, isLoading } = useWeatherServiceHook(setError);
  const snap = useSnapshot(state);

  const { resetGame, onBlurHandler, onFocusHandler, onKeyDownHandler } = useActions({
    setCitiesData,
    setUserGuesses,
    setResult,
    getWeather,
  });

  useEffect(() => {
    // Hook to compare user guesses with actual temperature, to show the result of the game
    const guessed = userGuesses.filter(el => el.guessed);
    if (userGuesses.length === cityNames.length) {
      if (guessed.length >= 3) {
        setResult(USER_WIN_MSG);
        state.winGames++;
      } else {
        setResult(USER_LOSE_MSG);
        state.looseGames++;
      }
      state.totalGames++;
    }
  }, [userGuesses, cityNames.length]);

  useEffect(() => {
    // Hook to handle errors
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center pt-4 flex-col">
      <div
        className="bg-yellow-50 p-6 rounded shadow-lg h-96 min-h-full max-w-xs flex flex-col justify-around"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h1 className="md:text-xl lg:text-xl  font-bold mb-4 text-yellow-950 uppercase">{GAME_TITLE}</h1>
        <div className="flex flex-1 flex-col">
          {!result &&
            cityNames.map(city => (
              <TemperatureInput
                cityName={city}
                key={city}
                inputProps={{
                  placeholder: `${TEMPERATURE_INPUT_PLACEHOLDER}`,
                  onFocus: onFocusHandler,
                  onBlur: e => onBlurHandler(e, city, parseInt(e.target.value)),
                  onKeyDown: e => onKeyDownHandler(e, city, parseInt(e.currentTarget.value)),
                  id: city,
                }}
              />
            ))}
          {!citiesData && (
            <div className="flex flex-1 justify-center items-center">
              <p className="mt-4 mb-7 font-bold text-3xl text-center text-yellow-950">{NO_CITIES}</p>
            </div>
          )}
          {result && (
            <div className="flex flex-1 justify-center items-center">
              <p className="mt-4 mb-7 font-bold text-6xl text-center  text-blue-600">{result}</p>
            </div>
          )}
          {citiesData && (
            <div className="flex flex-1 justify-between">
              <p className="text-yellow-950 font-semibold uppercase">win: {snap.winGames}</p>
              <p className="text-yellow-950 font-semibold uppercase">total: {snap.totalGames}</p>
              <p className="text-yellow-950 font-semibold uppercase">loose: {snap.looseGames}</p>
            </div>
          )}
        </div>
        {result && (
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold" onClick={resetGame}>
            {RESTART_BUTTON_TEXT}
          </Button>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center">
        {userGuesses.map(({ user, actual, id, cityName, guessed }) => (
          <Answer userAnswer={user} actualTemp={actual} key={id} cityName={cityName} guessed={guessed} />
        ))}
        <Spinner isLoading={isLoading} />
      </div>
    </div>
  );
};

export default memo(Game);

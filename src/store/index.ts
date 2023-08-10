import { proxy } from 'valtio';

const state = proxy({
  winGames: 0,
  looseGames: 0,
  totalGames: 0,
});

export default state;

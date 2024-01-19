import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from 'models/game.model';
import { AppDispatch } from './store';
import { initGame } from 'services/firebase/firebase-api.service';

const initialState: Game = {
  id: '',
  status: 'pending',
  players: [],
  cards: [],
  type: 'single',
  size: 'sm',
  lang: ['ru', 'en']
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getGame(state, action: PayloadAction<Game>) {
      return { ...action.payload };
    },
    reasetGame() {
      return { ...initialState };
    }
  },
  extraReducers(builder) {
    builder.addCase('game/start', (state, action) => {
      console.log(
        '%c Debug:',
        'background: #0E1926; color: #8EFF1E; padding: 8px 12px; font-size: 14px;',
        action
      );
    });
  }
});

export function startGame(id: string) {
  return function initGameThunk(dispatch: AppDispatch) {
    // initGame(id, (game: Game) => {
    //   dispatch({ type: 'game/start', payload: game });
    // });
    setInterval(() => {
      dispatch({ type: 'game/start', payload: 's' });
    }, 500);
  };
}

export const { getGame, reasetGame } = gameSlice.actions;
export default gameSlice.reducer;

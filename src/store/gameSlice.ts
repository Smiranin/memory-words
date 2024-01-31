import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, GameCard } from 'models/game.model';
import { AppDispatch, RootState } from './store';
import { subscribeToGame, updateActiveGame } from 'services/firebase/firebase-api.service';
import GameLogic from 'services/game-logic.service';

const initialState: Game = {
  id: '',
  status: 'pending',
  players: [],
  cards: [],
  type: 'single',
  size: 'sm',
  lang: ['ru', 'en'],
  activeCards: [],
  wordsLeft: Infinity
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getGame(state, action: PayloadAction<Game>) {
      return { ...action.payload };
    },
    resetGame() {
      return { ...initialState };
    },
    cardOpened(state, action: PayloadAction<GameCard>) {
      GameLogic.openCard(state, action.payload);
    },
    cardClosed(state, action: PayloadAction<GameCard>) {
      GameLogic.closeCard(state, action.payload);
    }
  }
});

export function startGame(id: string) {
  return function startGameThunk(dispatch: AppDispatch) {
    subscribeToGame(id, (game: Game) => {
      // If it's single game unsubscribe after first init.
      dispatch(getGame(game));
    });
  };
}

export function openCard(card: GameCard) {
  return function updateCardOnOpenThunk(dispatch: AppDispatch, test: any) {
    dispatch(cardOpened(card));
    let state = test() as RootState;
    updateActiveGame(state.game);
  };
}

export function closeCard(card: GameCard) {
  return function updateCardOnCloseThunk(dispatch: AppDispatch, test: any) {
    dispatch(cardClosed(card));
    let state = test() as RootState;
    updateActiveGame(state.game);
  };
}

export const { getGame, resetGame, cardOpened, cardClosed } = gameSlice.actions;
export default gameSlice.reducer;

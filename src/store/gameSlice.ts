import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, GameCard } from 'models/game.model';
import { AppDispatch, RootState } from './store';
import GameDBService from 'services/firebase/firebase-api.service';
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
    GameDBService.subscribeToGame(id, (game: Game) => {
      // If it's single game unsubscribe after first init.
      dispatch(getGame(game));
    });
  };
}

export function openCard(card: GameCard) {
  return function updateCardOnOpenThunk(dispatch: AppDispatch, storeAPI: any) {
    dispatch(cardOpened(card));
    let state = storeAPI() as RootState;
    GameDBService.updateActiveGame(state.game);
  };
}

export function closeCard(card: GameCard) {
  return function updateCardOnCloseThunk(dispatch: AppDispatch, storeAPI: any) {
    dispatch(cardClosed(card));
    let state = storeAPI() as RootState;
    GameDBService.updateActiveGame(state.game);
  };
}

export const { getGame, resetGame, cardOpened, cardClosed } = gameSlice.actions;
export default gameSlice.reducer;

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { CARD_STATUSES, Game, GameCard } from 'models/game.model';
import { AppDispatch, RootState } from './store';
import { subscribeToGame, updaGame } from 'services/firebase/firebase-api.service';

const initialState: Game = {
  id: '',
  status: 'pending',
  players: [],
  cards: [],
  type: 'single',
  size: 'sm',
  lang: ['ru', 'en'],
  activeCards: []
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
    updateCards(state, action: PayloadAction<GameCard>) {
      const targetCard = action.payload;
      let activeCards = state.activeCards || [];
      if (activeCards.length === 0) {
        state.cards.forEach((item) => {
          if (item.word === targetCard.word) {
            item.status = CARD_STATUSES.opened;
            activeCards.push(item);
          }
        });
      } else if (activeCards.length === 1) {
        const currentOpen = activeCards[0];
        const nextStatus =
          currentOpen.wordId === targetCard.wordId ? CARD_STATUSES.completed : CARD_STATUSES.opened;
        state.cards.forEach((item) => {
          if (item.word === targetCard.word || item.word === currentOpen.word) {
            item.status = nextStatus;
            activeCards.push(item);
          }
        });
        // If 2 we close opened two cards and open new one
      } else {
        activeCards = [];
        state.cards.forEach((item) => {
          item.status = item.status === CARD_STATUSES.opened ? CARD_STATUSES.closed : item.status;
          if (item.word === targetCard.word) {
            item.status = CARD_STATUSES.opened;
          }
        });
      }
    },
    closeCard(state, action: PayloadAction<GameCard>) {
      const targetCard = action.payload;
      state.cards.forEach((item) => {
        if (item.word === targetCard.word) {
          item.status = CARD_STATUSES.closed;
        }
      });
      state.activeCards = state.activeCards.filter((card) => card.word !== targetCard.word);
      updaGame(current(state));
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
  return function test(dispatch: AppDispatch) {
    subscribeToGame(id, (game: Game) => {
      console.log(
        '%c Debug:',
        'background: #0E1926; color: #8EFF1E; padding: 8px 12px; font-size: 14px;',
        'Init Game Page'
      );
      dispatch(getGame(game));
    });
  };
}

export function updateCardsV2(card: GameCard) {
  return function initGameThunk(dispatch: AppDispatch, test: any) {
    dispatch(updateCards(card));
    let state = test() as RootState;
    updaGame(state.game);
  };
}

export const { getGame, resetGame, updateCards, closeCard } = gameSlice.actions;
export default gameSlice.reducer;

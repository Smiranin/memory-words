import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CARD_STATUSES, Game, GameCard } from 'models/game.model';
import { AppDispatch, RootState } from './store';
import { subscribeToGame, updateActiveGame } from 'services/firebase/firebase-api.service';

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
    cardOpened(state, action: PayloadAction<GameCard>) {
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
    cardClosed(state, action: PayloadAction<GameCard>) {
      const targetCard = action.payload;
      state.cards.forEach((item) => {
        if (item.word === targetCard.word) {
          item.status = CARD_STATUSES.closed;
        }
      });
      state.activeCards = state.activeCards.filter((card) => card.word !== targetCard.word);
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
  return function startGameThunk(dispatch: AppDispatch) {
    subscribeToGame(id, (game: Game) => {
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

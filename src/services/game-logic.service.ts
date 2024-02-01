import { current } from '@reduxjs/toolkit';
import { CARD_STATUSES, Game, GameCard } from 'models/game.model';

export default class GameLogic {
  static openCard(state: Game, targetCard: GameCard): Game {
    state.activeCards = state.activeCards ?? [];
    const cardInList = state.cards.find((c) => c.word === targetCard.word);
    if (!cardInList) return state;
    cardInList.status = CARD_STATUSES.opened;

    if (state.activeCards.length === 0) {
      state.activeCards.push(cardInList);
    } else if (state.activeCards.length === 1) {
      state.activeCards.push(cardInList);
      if (state.activeCards[0].wordId === cardInList.wordId) {
        state.cards.forEach((c) => {
          if (c.wordId === cardInList.wordId) {
            c.status = CARD_STATUSES.completed;
          }
        });
        state.wordsLeft--;
      }
      // If 2 we close opened two cards and open new one
    } else {
      state.activeCards = [];
      state.cards.forEach((item) => {
        item.status = item.status === CARD_STATUSES.opened ? CARD_STATUSES.closed : item.status;
        if (item.word === targetCard.word) {
          item.status = CARD_STATUSES.opened;
          state.activeCards.push(item);
        }
      });
    }
    return state;
  }

  static closeCard(state: Game, targetCard: GameCard): Game {
    state.cards.forEach((item) => {
      item.status = item.status === CARD_STATUSES.opened ? CARD_STATUSES.closed : item.status;
    });
    state.activeCards = [];
    return state;
  }
}

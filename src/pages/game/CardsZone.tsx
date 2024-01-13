import { CARD_STATUSES, GameCard, GameSize } from 'models/game.model';
import Card from './Card';
import { getClassNameBySize } from 'utils/game-helpers';
import { useEffect, useState } from 'react';
import { produce } from 'immer';

export default function CardsZone(props: { cards: GameCard[]; size: GameSize }) {
  const [cards, setCards] = useState<GameCard[]>(props.cards);

  const colsClassName = getClassNameBySize(props.size);
  const cssClasses = `grid ${colsClassName} gap-4`;
  const activeCards: GameCard[] = [];

  useEffect(() => {
    cards.forEach((card) => {
      if (card.status === CARD_STATUSES.opened) {
        activeCards.push(card);
      }
    });
  }, [cards]);

  function openCardHandle(card: GameCard): void {
    const nextState = produce(cards, (draftState) => {
      if (activeCards.length === 0) {
        draftState.forEach((item) => {
          if (item.word === card.word) {
            item.status = CARD_STATUSES.opened;
          }
        });
      } else if (activeCards.length === 1) {
        const currentOpen = activeCards[0];
        const nextStatus =
          currentOpen.wordId === card.wordId ? CARD_STATUSES.completed : CARD_STATUSES.opened;
        draftState.forEach((item) => {
          if (item.word === card.word || item.word === currentOpen.word) {
            item.status = nextStatus;
          }
        });
        // If 2 we close opened two cards and open new one
      } else {
        draftState.forEach((item) => {
          item.status = item.status === CARD_STATUSES.opened ? CARD_STATUSES.closed : item.status;
          if (item.word === card.word) {
            item.status = CARD_STATUSES.opened;
          }
        });
      }
    });

    // debugger;
    setCards(nextState);
  }

  function timeoutHandle(card: GameCard): void {
    const nextState = produce(cards, (draftState) => {
      draftState.forEach((item) => {
        if (item.word === card.word) {
          card.status = CARD_STATUSES.closed;
        }
      });
    });
    setCards(nextState);
  }

  return (
    <div className={cssClasses}>
      {cards.map((card) => (
        <Card key={card.word} card={card} onOpen={openCardHandle} onTimeoutCb={timeoutHandle} />
      ))}
    </div>
  );
}

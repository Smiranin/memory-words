import { GAME_STATUSES, GameCard, GameSize } from 'models/game';
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
      if (card.status === GAME_STATUSES.opened) {
        activeCards.push(card);
      }
    });
  }, [cards]);

  function openCardHandle(card: GameCard): void {
    const nextState = produce(cards, (draftState) => {
      if (activeCards.length === 0) {
        draftState.forEach((item) => {
          if (item.id === card.id) {
            item.status = GAME_STATUSES.opened;
          }
        });
      } else if (activeCards.length === 1) {
        const currentOpen = activeCards[0];
        const nextStatus =
          currentOpen.word_id === card.word_id ? GAME_STATUSES.won : GAME_STATUSES.opened;
        draftState.forEach((item) => {
          if (item.id === card.id || item.id === currentOpen.id) {
            item.status = nextStatus;
          }
        });
        // If 2 we close opened two cards and open new one
      } else {
        draftState.forEach((item) => {
          item.status = item.status === GAME_STATUSES.opened ? GAME_STATUSES.closed : item.status;
          if (item.id === card.id) {
            item.status = GAME_STATUSES.opened;
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
        if (item.id === card.id) {
          card.status = GAME_STATUSES.closed;
        }
      });
    });
    setCards(nextState);
  }

  return (
    <div className={cssClasses}>
      {cards.map((card) => (
        <Card key={card.id} card={card} onOpen={openCardHandle} onTimeoutCb={timeoutHandle} />
      ))}
    </div>
  );
}

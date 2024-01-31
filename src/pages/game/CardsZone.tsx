import { GameCard } from 'models/game.model';
import Card from './Card';
import { getClassNameBySize } from 'utils/game-helpers';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { closeCard, openCard } from 'store/gameSlice';

export default function CardsZone() {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const colsClassName = getClassNameBySize(game.size);

  const cssClasses = `${colsClassName} m-2 grid gap-4 grid-flow-col h-[600px] border-2 border-black	border-solid	p-2`;

  function openCardHandle(card: GameCard): void {
    dispatch(openCard(card));
  }

  function timeoutHandle(card: GameCard): void {
    dispatch(closeCard(card));
  }

  return (
    <div className={cssClasses}>
      {game.cards.map((card) => (
        <Card key={card.word} card={card} onOpen={openCardHandle} onTimeoutCb={timeoutHandle} />
      ))}
    </div>
  );
}

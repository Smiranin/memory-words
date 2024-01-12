import { useParams } from 'react-router-dom';
import { generateCards } from 'utils/game-helpers';
import CardsZone from './CardsZone';

export default function Game() {
  const { id } = useParams<'id'>();
  const cards = generateCards();

  return (
    <div className="container">
      <h1>Game: #{id}</h1>
      <CardsZone cards={cards} size="sm" />
    </div>
  );
}

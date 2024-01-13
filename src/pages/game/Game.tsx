import { useParams } from 'react-router-dom';
import CardsZone from './CardsZone';

export default function Game() {
  const { id } = useParams<'id'>();

  return (
    <div className="container">
      <h1>Game: #{id}</h1>
      <CardsZone cards={[]} size="sm" />
    </div>
  );
}

import { useParams } from 'react-router-dom';
import CardsZone from './CardsZone';
import { useAppDispatch } from 'store/hooks';
import { useEffect } from 'react';
import { unsubscribeFromActiveGame } from 'services/firebase/firebase-api.service';
import { resetGame, startGame } from 'store/gameSlice';

export default function GamePage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  useEffect(() => {
    if (!id) return;
    dispatch(startGame(id));
    return () => {
      unsubscribeFromActiveGame();
      dispatch(resetGame());
    };
  }, [id]);

  return (
    <div className="container">
      <h1>Game: #{id}</h1>
      <CardsZone />
    </div>
  );
}

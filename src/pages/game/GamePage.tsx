import { useParams } from 'react-router-dom';
import CardsZone from './CardsZone';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useEffect } from 'react';
import { unsubscribeFromActiveGame, initGame } from 'services/firebase/firebase-api.service';
import { getGame, reasetGame } from 'store/gameSlice';
import { Game } from 'models/game.model';

export default function GamePage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  useEffect(() => {
    if (!id) return;
    const res = initGame(id, (game: Game) => {
      dispatch(getGame(game));
    });
    if (res.status === 'error') console.log(res.msg);
    return () => {
      unsubscribeFromActiveGame();
      dispatch(reasetGame());
    };
  }, []);

  return (
    <div className="container">
      <h1>Game: #{id}</h1>
      <CardsZone />
    </div>
  );
}

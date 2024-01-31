import { useParams } from 'react-router-dom';
import CardsZone from './CardsZone';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useEffect } from 'react';
import { unsubscribeFromActiveGame } from 'services/firebase/firebase-api.service';
import { resetGame, startGame } from 'store/gameSlice';

export default function GamePage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const wordsLeft = useAppSelector((state) => state.game.wordsLeft);

  useEffect(() => {
    if (!id) return;
    dispatch(startGame(id));
    return () => {
      unsubscribeFromActiveGame();
      dispatch(resetGame());
    };
  }, [id]);

  useEffect(() => {
    if (wordsLeft > 0) return;
    alert('You won!');
  }, [wordsLeft]);

  return (
    <div className="container m-auto h-full p-2 ">
      <CardsZone />
    </div>
  );
}

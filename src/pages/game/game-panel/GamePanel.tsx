import { useAppSelector } from 'store/hooks';
import PlayerTimer from './Timer';

export default function GamePanel() {
  const players = useAppSelector((state) => state.game.players);
  const activePlayer = players.find((p) => p.active) ?? players[0];
  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-1">
          <span>Your steps:</span>
          <span>{activePlayer?.steps}</span>
        </div>
        <div className="flex flex-1 justify-end">
          <span>Time:</span>
          <PlayerTimer></PlayerTimer>
        </div>
      </div>
    </>
  );
}

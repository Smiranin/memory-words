import { GAME_STATUSES, GameCard, GameSize } from 'models/game';

export function getClassNameBySize(size: GameSize): string {
  switch (size) {
    case 'sm':
      return 'grid-cols-3';
    case 'md':
      return 'grid-cols-4';
    case 'lg':
      return 'grid-cols-5';
    default:
      return 'grid-cols-3';
  }
}

// Remove after real data will recive
export function generateCards(): GameCard[] {
  // 3 x 2
  let count = 6;
  const res: GameCard[] = [];
  while (count) {
    res.push({
      id: `${count}`,
      word: `word${count}`,
      word_id: `${count}`,
      status: GAME_STATUSES.closed
    });
    count--;
  }
  return res;
}

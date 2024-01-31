import { GameSize } from 'models/game.model';

export function getClassNameBySize(size: GameSize): string {
  switch (size) {
    case 'sm':
      return 'grid-rows-[repeat(3,_1fr)]';
    case 'md':
      return 'grid-cols-4';
    case 'lg':
      return 'grid-cols-5';
    default:
      return 'grid-rows-[repeat(3,_1fr)]';
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

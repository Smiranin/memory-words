export type GameSize = 'sm' | 'md' | 'lg';
type GameStatus = 0 | 1 | 2;

interface GameStatusesType {
  closed: GameStatus;
  opened: GameStatus;
  won: GameStatus;
}

export interface GameCard {
  id: string;
  word_id: string;
  word: string;
  status: GameStatus;
}

export const GAME_STATUSES: GameStatusesType = {
  closed: 0,
  opened: 1,
  won: 2
};

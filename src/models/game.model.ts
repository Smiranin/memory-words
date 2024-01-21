export interface Game extends GameSettings {
  id: string;
  status: GameStatus;
  players: GameUser[];
  cards: GameCard[];
  activeCards: GameCard[];
}

export interface GameSettings {
  type: GameType;
  size: GameSize;
  lang: [Lnag, Lnag];
}

export interface GameCard {
  wordId: string;
  word: string;
  status: CardStatus;
}

export interface GameUser {
  userId: string;
  name: string;
  active: boolean;
  score: number;
  winner: boolean;
}

export type GameSize = 'sm' | 'md' | 'lg';

export type CardStatus = 'opened' | 'closed' | 'completed';

export type GameStatus = 'pending' | 'active' | 'cancelled' | 'completed';

export type GameType = 'single' | 'multi';

export type Lnag = 'en' | 'ru';

// Constants:

interface GameStatusesType {
  pending: GameStatus;
  active: GameStatus;
  cancelled: GameStatus;
  completed: GameStatus;
}

export const GAME_STATUSES: GameStatusesType = {
  pending: 'pending',
  active: 'active',
  cancelled: 'cancelled',
  completed: 'completed'
};

interface CardStatusesType {
  opened: CardStatus;
  closed: CardStatus;
  completed: CardStatus;
}

export const CARD_STATUSES: CardStatusesType = {
  opened: 'opened',
  closed: 'closed',
  completed: 'completed'
};

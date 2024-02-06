import { initializeApp } from 'firebase/app';
import { DatabaseReference, getDatabase, off, onValue, ref, update } from 'firebase/database';
import { firebaseConfig } from './config';
import { Word } from 'models/words.model';
import { Game, Player } from 'models/game.model';

initializeApp(firebaseConfig);
const db = getDatabase();
const wordsRef = ref(db, '/words');
let activeGame: DatabaseReference | null = null;
let activeUsers: DatabaseReference | null = null;

export default class GameDBService {
  static async addNewGame(game: Game): Promise<void> {
    const updates: Record<string, Game> = {};
    updates[`/games/${game.id}`] = game;
    return update(ref(db), updates);
  }

  static subscribeToGame(id: string, cb: Function): { status: 'ok' | 'error'; msg?: string } {
    if (activeGame) {
      GameDBService.unsubscribeFromActiveGame();
    }
    activeGame = ref(db, `games/${id}`);
    activeUsers = ref(db, `games/${id}/users`);
    if (!activeGame) {
      return { status: 'error', msg: 'Game not found' };
    }
    onValue(activeGame, (snapshot) => cb(snapshot.val()));
    return { status: 'ok' };
  }

  static updateActiveGame(game: Game): void {
    if (activeGame) {
      update(activeGame, game);
    }
  }

  static updateActiveUsers(users: Player[]): void {
    if (activeUsers) {
      update(activeUsers, users);
    }
  }

  static unsubscribeFromActiveGame(): void {
    if (activeGame && activeUsers) {
      off(activeGame);
      off(activeUsers);
      activeGame = null;
      activeUsers = null;
    }
  }

  static async getWords(): Promise<Word[]> {
    return new Promise((resolve) => {
      onValue(wordsRef, (snapshot) => resolve(snapshot.val()), { onlyOnce: true });
    });
  }
}

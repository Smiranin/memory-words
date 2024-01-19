import { initializeApp } from 'firebase/app';
import { DatabaseReference, getDatabase, off, onValue, ref, update } from 'firebase/database';
import { firebaseConfig } from './config';
import { Word } from 'models/words.model';
import { Game } from 'models/game.model';

initializeApp(firebaseConfig);
const db = getDatabase();
const wordsRef = ref(db, '/words');
let activeGame: DatabaseReference | null = null;

export async function addNewGame(game: Game): Promise<void> {
  const updates: Record<string, Game> = {};
  updates[`/games/${game.id}`] = game;
  return update(ref(db), updates);
}

export function initGame(id: string, cb: Function): { status: 'ok' | 'error'; msg?: string } {
  activeGame = ref(db, `games/${id}`);
  if (!activeGame) {
    return { status: 'error', msg: 'Game not found' };
  }
  onValue(activeGame, (snapshot) => cb(snapshot.val()));
  return { status: 'ok' };
}

export function unsubscribeFromActiveGame(): void {
  if (activeGame) {
    off(activeGame);
  }
}

export async function getWords(): Promise<Word[]> {
  return new Promise((resolve) => {
    onValue(wordsRef, (snapshot) => resolve(snapshot.val()), { onlyOnce: true });
  });
}

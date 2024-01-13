import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { firebaseConfig } from './config';
import { Word } from 'models/words.model';
import { Game } from 'models/game.model';

initializeApp(firebaseConfig);
const database = getDatabase();
const wordsRef = ref(database, '/words');

export async function addNewGame(game: Game): Promise<void> {
  const updates: Record<string, Game> = {};
  updates[`/games/${game.id}`] = game;

  return update(ref(database), updates);
}

export async function getWords(): Promise<Word[]> {
  return new Promise((resolve) => {
    onValue(wordsRef, (snapshot) => resolve(snapshot.val()), { onlyOnce: true });
  });
}

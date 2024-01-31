import { Game, GameCard, GameSettings, GameSize, GameUser } from 'models/game.model';
import { addNewGame, getWords } from './firebase/firebase-api.service';
import { Word } from 'models/words.model';
import { shuffleArray } from 'utils/game-helpers';
import { AppUser } from 'models/user.model';
import { nanoid } from 'nanoid';

export async function createGame(params: GameSettings & { user: AppUser }): Promise<Game> {
  let words = await getWords();
  const { size, lang, user, type } = params;
  let cards = generateCards({ words, size, lang });
  const game: Game = {
    id: nanoid(),
    status: 'pending',
    players: [createGameUser(user)],
    cards: cards,
    activeCards: [],
    lang,
    size,
    type,
    wordsLeft: cards.length / 2
  };
  return addNewGame(game).then((_) => game);
}

function generateCards({ words, size, lang }: Omit<GameSettings, 'type'> & { words: Word[] }): GameCard[] {
  const [primaryLang, secondaryLang] = lang;
  const adjustedWords = adjustArrayBySize(words, size);
  const cards: GameCard[] = [];
  adjustedWords.forEach((word) => {
    cards.push(
      {
        wordId: word.wordId,
        word: word[primaryLang],
        status: 'closed'
      },
      {
        wordId: word.wordId,
        word: word[secondaryLang],
        status: 'closed'
      }
    );
  });
  return shuffleArray<GameCard>(cards);
}

function createGameUser(user: AppUser): GameUser {
  return {
    userId: user.id,
    name: user.fullName,
    active: false,
    score: 0,
    winner: false
  };
}

function adjustArrayBySize(arr: Word[], size: GameSize): Word[] {
  switch (size) {
    case 'sm':
      return arr.slice(0, 3);
    case 'md':
      return arr.slice(0, 8);
    case 'lg':
      return arr.slice(0, 10);
    default:
      return arr.slice(0, 6);
  }
}

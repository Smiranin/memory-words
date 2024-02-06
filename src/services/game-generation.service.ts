import { Game, GameCard, GameSettings, GameSize, Player } from 'models/game.model';
import GameDBService from './firebase/firebase-api.service';
import { Word } from 'models/words.model';
import { shuffleArray } from 'utils/game-helpers';
import { AppUser } from 'models/user.model';
import { nanoid } from 'nanoid';

export default class GameGenerationService {
  static async createGame(params: GameSettings & { user: AppUser }): Promise<Game> {
    let words = await GameDBService.getWords();
    const { size, lang, user, type } = params;
    let cards = GameGenerationService.generateCards({ words, size, lang });
    const game: Game = {
      id: nanoid(),
      status: 'pending',
      players: [GameGenerationService.createGameUser(user)],
      cards: cards,
      activeCards: [],
      lang,
      size,
      type,
      wordsLeft: cards.length / 2
    };
    return GameDBService.addNewGame(game).then((_) => game);
  }

  static generateCards({ words, size, lang }: Omit<GameSettings, 'type'> & { words: Word[] }): GameCard[] {
    const [primaryLang, secondaryLang] = lang;
    const adjustedWords = GameGenerationService.adjustArrayBySize(words, size);
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

  static createGameUser(user: AppUser): Player {
    return {
      userId: user.username,
      name: user.username,
      active: false,
      score: 0,
      winner: false,
      steps: 0
    };
  }

  static adjustArrayBySize(arr: Word[], size: GameSize): Word[] {
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
}

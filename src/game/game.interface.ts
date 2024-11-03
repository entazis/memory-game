import { Card } from "./card/Card.interface";

interface Deck {
  cards: Card[];
  cardToMatch: Card | null;
}

interface Settings {
  cardPairsCount: number;
  timer: number;
  cardRepository: Card[];
  badGuessesLimit: number;
  flipBackTimeout: number;
  userName: string;
}

interface Progress {
  isStarted: boolean;
  isEnded: boolean;
  won: boolean;
  score: number;
  elapsedTime: number;
}

export interface GameState {
  deck: Deck;
  settings: Settings;
  progress: Progress;
}

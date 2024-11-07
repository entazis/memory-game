import { Card } from "./card/Card.interface";

interface Settings {
  cardPairsCount: number;
  timer: number;
  cardRepository: Card[];
  badGuessesLimit: number;
  flipBackTimeout: number;
  userName: string;
}

interface Progress {
  cards: Card[];
  isStarted: boolean;
  isEnded: boolean;
  cardsFlipped: Card[];
  won: boolean;
  score: number;
  elapsedTime: number;
}

export interface GameState {
  progress: Progress;
  settings: Settings;
}

import { Card } from "./card/Card.interface";

export interface Settings {
  cardPairsCount: number;
  timer: number;
  cardRepository: Card[];
  badGuessesLimit: number;
  flipBackTimeout: number;
  userName: string;
}

interface Progress {
  cards: Card[];
  startedAt: number | null;
  endedAt: number | null;
  //TODO refactor to use card indexes
  cardsFlipped: Card[];
  won: boolean;
  score: number;
  mistakes: number;
  elapsedTime: number;
}

export interface GameState {
  progress: Progress;
  settings: Settings;
}

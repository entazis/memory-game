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
  startedAt: Date | null;
  endedAt: Date | null;
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

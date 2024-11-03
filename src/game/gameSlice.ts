import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

//TODO separate interfaces to separate file
interface Card {
  id: string;
  imageRef: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Deck {
  cards: Card[];
  flippedCard: boolean;
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

const initialState: GameState = {
  deck: {
    cards: [],
    flippedCard: false,
  },
  settings: {
    cardPairsCount: 12,
    timer: 60,
    cardRepository: [],
    badGuessesLimit: 0,
    flipBackTimeout: 5,
    userName: "",
  },
  progress: {
    isStarted: false,
    isEnded: false,
    won: false,
    score: 0,
    elapsedTime: 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createDeck: (state) => {
      state.deck.cards = [
        {
          id: "1",
          imageRef: "fox",
          isFlipped: false,
          isMatched: false,
        },
        {
          id: "2",
          imageRef: "dog",
          isFlipped: false,
          isMatched: false,
        },
        {
          id: "3",
          imageRef: "cat",
          isFlipped: false,
          isMatched: false,
        },
      ];
    },
    shuffleDeck: (state) => {
      //TODO implement
    },
    flipCard: (state, action: PayloadAction<string>) => {
      const card = state.deck.cards.find((card) => card.id === action.payload);
      if (card) {
        card.isFlipped = !card.isFlipped;
      }
    },
    checkPairs: (state) => {
      //TODO implement
    },
  },
});

export const { createDeck, shuffleDeck, flipCard, checkPairs } =
  gameSlice.actions;

const selectCardsState = (state: RootState) => state.game.deck.cards;
const selectCardId = (state: RootState, cardId: string) => cardId;
const selectCards = createSelector([selectCardsState], (value) => value || []);
export const selectCardById = createSelector(
  [selectCards, selectCardId],
  (cards, cardId) => cards.find((card) => card.id === cardId),
);

export const selectDeck = (state: RootState) => state.game.deck;
export const selectSettings = (state: RootState) => state.game.settings;
export const selectProgress = (state: RootState) => state.game.progress;

export default gameSlice.reducer;

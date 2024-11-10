import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import cardRepository from "./card/cardRepository";
import { GameState, Settings } from "./game.interface";
import { shuffleCards } from "./game.util";

export const initialState: GameState = {
  settings: {
    cardPairsCount: 12,
    timer: 60,
    cardRepository: [],
    badGuessesLimit: 10,
    flipBackTimeout: 2,
    userName: "anonymous",
  },
  progress: {
    cards: [...cardRepository],
    cardsFlipped: [],
    startedAt: null,
    endedAt: null,
    won: false,
    score: 0,
    mistakes: 0,
    elapsedTime: 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initCards: (state) => {
      state.progress.cards = shuffleCards(state.settings.cardPairsCount);
    },
    flipCard: (state, action: PayloadAction<number>) => {
      const { progress } = state;
      const { cards, cardsFlipped, endedAt } = progress;
      const card = cards[action.payload];
      if (cardsFlipped.length < 2 && !endedAt) {
        card.isFlipped = true;
        progress.startedAt = progress.startedAt || new Date().getTime();
        progress.cardsFlipped.push(card);
      }
    },
    matchCards: (state) => {
      const flippedCards = state.progress.cards.filter(
        (card) => card.isFlipped && !card.isMatched,
      );
      if (flippedCards.length === 2) {
        if (flippedCards[0].id === flippedCards[1].id) {
          console.log("Matched!");
          flippedCards[0].isMatched = true;
          flippedCards[1].isMatched = true;
          state.progress.score++;
          state.progress.cardsFlipped = [];

          if (state.progress.score === state.settings.cardPairsCount) {
            state.progress.won = true;
            state.progress.endedAt = new Date().getTime();
          }
        } else {
          console.log("Not matched!");
          state.progress.mistakes++;

          if (state.progress.mistakes >= state.settings.badGuessesLimit) {
            state.progress.endedAt = new Date().getTime();
          }
        }
      }
    },
    flipBackUnmatched: (state) => {
      state.progress.cards
        .filter((card) => card.isFlipped && !card.isMatched)
        .forEach((card) => {
          card.isFlipped = false;
        });
      state.progress.cardsFlipped = [];
    },
    tick: (state) => {
      const { progress } = state;
      if (progress.startedAt) {
        progress.elapsedTime =
          (new Date().getTime() - progress.startedAt) / 1000;
        if (progress.elapsedTime >= state.settings.timer) {
          progress.endedAt = new Date().getTime();
        }
      }
    },
    updateSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetProgress: (state) => {
      state.progress = {
        ...initialState.progress,
        cards: shuffleCards(state.settings.cardPairsCount),
      };
    },
  },
});

export const {
  initCards,
  flipCard,
  matchCards,
  flipBackUnmatched,
  tick,
  updateSettings,
  resetProgress,
} = gameSlice.actions;

const selectCardsState = (state: RootState) => state.game.progress.cards;
const selectCardIndex = (state: RootState, cardIndex: number) => cardIndex;
const selectCards = createSelector([selectCardsState], (value) => value || []);
export const selectCardByIndex = createSelector(
  [selectCards, selectCardIndex],
  (cards, cardIndex) => cards[cardIndex],
);

export const selectSettings = (state: RootState) => state.game.settings;
export const selectProgress = (state: RootState) => state.game.progress;

export default gameSlice.reducer;

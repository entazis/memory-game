import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import cardRepository from "./card/cardRepository";
import { GameState } from "./game.interface";
import { durstenfeldShuffle } from "./game.util";

const initialState: GameState = {
  settings: {
    cardPairsCount: 12,
    timer: 60000,
    cardRepository: [],
    badGuessesLimit: 0,
    flipBackTimeout: 2000,
    userName: "",
  },
  progress: {
    cards: [],
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
    createDeck: (state) => {
      const cards = cardRepository
        .concat(cardRepository)
        .map((card) => ({ ...card }));
      durstenfeldShuffle(cards);
      state.progress.cards = cards;
    },
    flipCard: (state, action: PayloadAction<number>) => {
      const { progress } = state;
      const card = progress.cards[action.payload];
      card.isFlipped = true;
      progress.startedAt = progress.startedAt || new Date();
      progress.cardsFlipped.push(card);
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

          //TODO could not flip new cards until the cardsFlipped is not cleared
        } else {
          console.log("Not matched!");
          state.progress.mistakes++;
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
          new Date().getTime() - progress.startedAt.getTime();
        if (progress.elapsedTime >= state.settings.timer) {
          progress.endedAt = new Date();
        }
      }
    },
  },
});

export const { createDeck, flipCard, matchCards, flipBackUnmatched, tick } =
  gameSlice.actions;

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

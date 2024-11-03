import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import cardRepository from "./card/cardRepository";
import { GameState } from "./game.interface";
import { durstenfeldShuffle } from "./game.util";

const initialState: GameState = {
  deck: {
    cards: [],
    cardToMatch: null,
  },
  settings: {
    cardPairsCount: 12,
    timer: 60000,
    cardRepository: [],
    badGuessesLimit: 0,
    flipBackTimeout: 5000,
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
      const cards = cardRepository
        .concat(cardRepository)
        .map((card) => ({ ...card }));
      durstenfeldShuffle(cards);
      state.deck.cards = cards;
    },
    shuffleDeck: (state) => durstenfeldShuffle(state.deck.cards),
    flipCard: (state, action: PayloadAction<number>) => {
      const card = state.deck.cards[action.payload];
      if (card) {
        state.progress.isStarted = true;
        card.isFlipped = !card.isFlipped;

        if (state.deck.cardToMatch) {
          const flippedCards = state.deck.cards.filter(
            (card) => card.isFlipped && !card.isMatched,
          );
          if (
            flippedCards.length === 2 &&
            flippedCards[0].id === flippedCards[1].id
          ) {
            flippedCards.forEach((card) => (card.isMatched = true));
          }
          state.deck.cardToMatch = null;
        } else {
          state.deck.cardToMatch = card;
        }
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
const selectCardIndex = (state: RootState, cardIndex: number) => cardIndex;
const selectCards = createSelector([selectCardsState], (value) => value || []);
export const selectCardByIndex = createSelector(
  [selectCards, selectCardIndex],
  (cards, cardIndex) => cards[cardIndex],
);

export const selectDeck = (state: RootState) => state.game.deck;
export const selectSettings = (state: RootState) => state.game.settings;
export const selectProgress = (state: RootState) => state.game.progress;

export default gameSlice.reducer;

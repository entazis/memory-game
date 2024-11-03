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
        card.isFlipped = !card.isFlipped;

        //TODO review matching logic
        state.deck.cardToMatch = card.isFlipped ? card : null;
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

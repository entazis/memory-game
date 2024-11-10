import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../app/game/game.slice";

//TODO create store/index.ts

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import slackUserReducer from "../components/SlackUser/slackUserSlice";

export const store = configureStore({
  reducer: {
    slackUser: slackUserReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

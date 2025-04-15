import { createSlice } from "@reduxjs/toolkit";
import { fetchSlackUsers } from "./slackUserActionCreators";

export interface SlackUserInfo {
  id: string;
  real_name: string;
  image: string;
  presence: string;
}

interface SlackUserState {
  users: SlackUserInfo[];
  loading: boolean;
  error: string | null;
}

const initialState: SlackUserState = {
  users: [],
  loading: false,
  error: null,
};

const slackUserSlice = createSlice({
  name: "slackUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlackUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlackUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchSlackUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default slackUserSlice.reducer;

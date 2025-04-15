import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlackUserInfo } from "./slackUserSlice";

export const fetchSlackUsers = createAsyncThunk<SlackUserInfo[]>(
  "slackUser/fetchSlackUsers",
  async () => {
    const response = await axios.get("https://vwzbvkln-3000.use.devtunnels.ms/status/slack/users");
    return response.data;
  }
);

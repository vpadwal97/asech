import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: null,
  tinymceApiID : "ljg83y8hvjknl22l8vbjn86wcm1nly0rrwkkz1rdjqfuzohw",
  gitCreds: {
    repoOwner: "vpadwal97",
    repoName: "asech-thoughts",
    branch: "main",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories = action.payload;
    },
  },
});

export const { setStories } = appSlice.actions;

export const selectStories = (state) => state.app.stories;
export const selectGitCreds = (state) => state.app.gitCreds;
export const selectTinymceApiID = (state) => state.app.tinymceApiID;

export default appSlice.reducer;

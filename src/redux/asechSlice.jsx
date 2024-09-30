import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: null,
  switchTheme: false,
  tinymceApiID : "ljg83y8hvjknl22l8vbjn86wcm1nly0rrwkkz1rdjqfuzohw",
  gitCreds: {
    githubToken : "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",
    repoOwner: "vpadwal97",
    repoName: "asech-thoughts",
    branch: "main",
    // githubToken: process.env.GITHUB_TOKEN || '',
    // repoOwner: process.env.REPO_OWNER || '',
    // repoName: process.env.REPO_NAME || '',
    // branch: process.env.BRANCH || 'main',
  },
};

export const asechSlice = createSlice({
  name: "asech",
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    setswitchTheme: (state, action) => {
      state.switchTheme = action.payload;
    },
  },
});

export const { setStories,setswitchTheme } = asechSlice.actions;

export const selectStories = (state) => state.asech.stories;
export const selectswitchTheme = (state) => state.asech.switchTheme;
export const selectGitCreds = (state) => state.asech.gitCreds;
export const selectTinymceApiID = (state) => state.asech.tinymceApiID;

export default asechSlice.reducer;

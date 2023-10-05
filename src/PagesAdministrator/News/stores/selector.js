import { createSelector } from "reselect";
import { INIT_STATE_NEWS } from "./state";

const selectNewsData = (state) => state.newsReducers || INIT_STATE_NEWS;

const selectNews = createSelector(selectNewsData, (state) => state.news || {});

export { selectNews };

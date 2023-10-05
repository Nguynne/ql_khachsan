import { createSelector } from "reselect";
import { INIT_STATE_NEWS_RESIDENT } from "./states";

const selectUser = (state) =>
  state.newsResidentReducers || INIT_STATE_NEWS_RESIDENT;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectData = createSelector(
  selectUser,
  (state) => state.dataNewsResident || []
);
const selectDetail = createSelector(
  selectUser,
  (state) => state.dataDetailNews || []
);

export { selectLoading, selectData, selectDetail };

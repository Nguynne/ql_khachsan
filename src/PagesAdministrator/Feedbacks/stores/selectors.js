import { createSelector } from "reselect";
import { INIT_STATE_FEEDBACKS } from "./states";

const selectUser = (state) => state.feedbacksReducers || INIT_STATE_FEEDBACKS;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectDataUser = createSelector(
  selectUser,
  (state) => state.dataUser || []
);
const selectDetail = createSelector(
  selectUser,
  (state) => state.dataDetail || []
);

export { selectLoading, selectDataUser, selectDetail };

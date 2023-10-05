import { createSelector } from "reselect";
import { INIT_STATE_CREATE_FEEDBACK } from "./states";

const selectUser = (state) =>
  state.createFeedbackReducers || INIT_STATE_CREATE_FEEDBACK;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectDataUser = createSelector(selectUser, (state) => state.dataUser);
const selectDataRoom = createSelector(selectUser, (state) => state.dataRoom);
const selectDataRole = createSelector(selectUser, (state) => state.dataRole);

export { selectLoading, selectDataUser, selectDataRole, selectDataRoom };

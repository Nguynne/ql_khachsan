import { createSelector } from "reselect";
import { INIT_STATE_ACCOUNT_USER } from "./states";

const selectUser = (state) =>
  state.editccountUserReducers || INIT_STATE_ACCOUNT_USER;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectDataUser = createSelector(
  selectUser,
  (state) => state.dataUserEdit
);
const selectDataRoom = createSelector(selectUser, (state) => state.dataRoom);
const selectDataRole = createSelector(selectUser, (state) => state.dataRole);

export { selectLoading, selectDataUser, selectDataRole, selectDataRoom };

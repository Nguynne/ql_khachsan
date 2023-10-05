import { createSelector } from "reselect";
import { INIT_STATE_CREATE_ACCOUNT } from "./states";

const selectAccount = (state) =>
  state.createAccountReducers || INIT_STATE_CREATE_ACCOUNT;

const selectLoading = createSelector(selectAccount, (state) => state.isLoading);
const selectDataAccount = createSelector(
  selectAccount,
  (state) => state.dataAccount
);
const selectDataRoom = createSelector(selectAccount, (state) => state.dataRoom);
const selectDataRole = createSelector(selectAccount, (state) => state.dataRole);

export { selectLoading, selectDataAccount, selectDataRole, selectDataRoom };

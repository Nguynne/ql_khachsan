import { createSelector } from "reselect";
import { INIT_STATE_CHANGE_PASS } from "./states";

const selectUser = (state) => state.changePWReducers || INIT_STATE_CHANGE_PASS;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectDataUser = createSelector(selectUser, (state) => state.dataUser);
const selectDataRoom = createSelector(selectUser, (state) => state.dataRoom);
const selectDataRole = createSelector(selectUser, (state) => state.dataRole);

export { selectLoading, selectDataUser, selectDataRole, selectDataRoom };
